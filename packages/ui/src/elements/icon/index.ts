import { html, HTMLTemplateResult, LitElement, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { isTemplateResult } from 'lit/directive-helpers.js';
import { emitEvent } from '../../utilities/events';
import styles from './styles.css?inline';

const CACHEABLE_ERROR = Symbol();
const RETRYABLE_ERROR = Symbol();
type SVGResult = HTMLTemplateResult | SVGSVGElement | typeof RETRYABLE_ERROR | typeof CACHEABLE_ERROR;

let parser: DOMParser;
const iconCache = new Map<string, Promise<SVGResult>>();

// Request queue with concurrency limit
const MAX_CONCURRENT_REQUESTS = 10;
const requestQueue: Array<() => void> = [];
let activeRequests = 0;

function queueRequest(callback: () => void) {
  if (activeRequests < MAX_CONCURRENT_REQUESTS) {
    activeRequests++;
    callback();
  } else {
    requestQueue.push(callback);
  }
}

function requestComplete() {
  activeRequests--;
  if (requestQueue.length > 0) {
    const nextRequest = requestQueue.shift();
    if (nextRequest) {
      activeRequests++;
      nextRequest();
    }
  }
}

export enum EnumLibrary {
  FONTAWESOME = 'fontawesome',
  BOOTSTRAP = 'bootstrap',
}

/**
 * @since 5.0.0
 * @status stable
 *
 * @tagname kemet-icon
 * @summary An element that represents an icon from a predefined set of open sourced icons.
 *
 * @prop {string} name - The name of the icon to reference.
 * @prop {string} library - The library of icons to use. Values include: (bootstrap | fontawesome)
 * @prop {string} family - The family of icons to use. The family is relative to the library being used. Font awesome values include: (regular | solid | brand)
 * @prop {string} version - The version of the icon library to use. Use latest to grab the most recent version.
 * @prop {number} size - The width and height of the icon in pixels.
 * @prop {'light' | 'dark'} polarity - Determines if the component has a dark or light background
 * @prop {string} dom - The status of dom initalization.
 *
 * @fires kemet-icon-mounted - Fired when the icon is mounted to the DOM
 * @detail {HTMLElement} element - The icon element
 *
 */

@customElement('kemet-icon')
export default class KemetIcon extends LitElement {
  static styles = [unsafeCSS(styles)];

  @property({ type: String })
  name: string = 'house';

  @property({ type: String })
  library: string = 'bootstrap';

  @property({ type: String })
  family: string = 'regular';

  @property({ type: Number })
  size: number = 16;

  @property({ type: String })
  version?: string;

  @property({ type: String, reflect: true })
  polarity: 'light' | 'dark' = 'light';

  @property({ type: String, reflect: true })
  dom: string = 'initializing';

  /** @internal */
  @state()
  private svg: SVGElement | HTMLTemplateResult | null = null;

  /** @internal */
  @state()
  private url: string = 'https://unpkg.com/bootstrap-icons@latest/icons';

  /** @internal */
  private isVisible: boolean = false;

  connectedCallback() {
    super.connectedCallback();
    // Load icon when connected to DOM
    this.updateUrl();
    if (!this.svg) {
      this.isVisible = true;
      this.setIcon();
    }
  }

  updated() {
    this.updateUrl();
    this.updateSize();
  }

  firstUpdated() {
    emitEvent(this, 'kemet-icon-mounted', {
      bubbles: true,
      composed: true,
      detail: {
        element: this,
      },
    });
    this.dom = 'mounted';
  }

  render() {
    // Return the svg if it's loaded, otherwise show placeholder
    if (this.svg) {
      return this.svg;
    }

    // If not loaded, trigger loading
    if (!this.isVisible) {
      this.isVisible = true;
      this.setIcon();
    }

    return html`<svg part="svg" width="${this.size}" height="${this.size}" viewBox="0 0 16 16"></svg>`;
  }

  /** Public method to force icon loading */
  public loadIcon() {
    this.isVisible = true;
    this.setIcon();
  }

  async setIcon() {
    if (!this.isVisible) return;

    let iconResolver = iconCache.get(`${this.family}/${this.name}`);

    if (!iconResolver) {
      iconResolver = this.resolveIcon();
      iconCache.set(`${this.family}/${this.name}`, iconResolver);
    }

    const svg = await iconResolver;

    if (svg === RETRYABLE_ERROR) {
      iconCache.delete(`${this.family}/${this.name}`);
    }

    if (isTemplateResult(svg)) {
      this.svg = svg;
    } else if (svg instanceof SVGSVGElement) {
      // Clone the SVG so each icon instance gets its own copy
      this.svg = svg.cloneNode(true) as SVGSVGElement;
    }
  }

  private updateUrl() {
    switch (this.library) {
      case EnumLibrary.FONTAWESOME:
        this.version = this.version || '7.3.1';
        this.url = `https://unpkg.com/@fortawesome/fontawesome-free@${this.version}/svgs`;
        break;
      case EnumLibrary.BOOTSTRAP:
        this.version = this.version || '1.11.3';
        this.url = `https://unpkg.com/bootstrap-icons@${this.version}/icons`;
        break;
    }
  }

  private async resolveIcon(): Promise<SVGResult> {
    return new Promise((resolve) => {
      queueRequest(async () => {
        let fileData: Response;
        let fetchURL: string = `${this.url}/${this.family}/${this.name}.svg`;

        switch (this.library) {
          case EnumLibrary.FONTAWESOME:
            fetchURL = `${this.url}/${this.family}/${this.name}.svg`;
            break;
          case EnumLibrary.BOOTSTRAP:
            fetchURL = `${this.url}/${this.name}.svg`;
            break;
        }

        try {
          fileData = await fetch(fetchURL);
          if (!fileData.ok) {
            requestComplete();
            resolve(fileData.status === 410 ? CACHEABLE_ERROR : RETRYABLE_ERROR);
            return;
          }
        } catch {
          requestComplete();
          resolve(RETRYABLE_ERROR);
          return;
        }

        try {
          const div = document.createElement('div');
          div.innerHTML = await fileData.text();

          const svg = div.firstElementChild;
          if (svg?.tagName?.toLowerCase() !== 'svg') {
            requestComplete();
            resolve(CACHEABLE_ERROR);
            return;
          }

          if (!parser) parser = new DOMParser();
          const doc = parser.parseFromString(svg.outerHTML, 'text/html');

          const svgEl = doc.body.querySelector('svg');
          if (!svgEl) {
            requestComplete();
            resolve(CACHEABLE_ERROR);
            return;
          }

          svgEl.part.add('svg');
          svgEl.setAttribute('width', `${this.size}px`);
          svgEl.setAttribute('height', `${this.size}px`);

          requestComplete();
          resolve(document.adoptNode(svgEl));
        } catch {
          requestComplete();
          resolve(CACHEABLE_ERROR);
        }
      });
    });
  }

  private updateSize() {
    if (this.svg) {
      const svg = this.svg as SVGElement;
      svg.setAttribute('width', `${this.size}px`);
      svg.setAttribute('height', `${this.size}px`);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kemet-icon': KemetIcon
  }
}
