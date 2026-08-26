import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { emitEvent } from '../../utilities/events';
import styles from './styles.css?inline';

export enum EnumEffects {
  Fade = 'fade',
  Flip = 'flip',
}

/**
 * @since 1.0.0
 * @status stable
 *
 * @tagname kemet-rotator
 * @summary A component that rotates through an array of text.
 *
 * @prop {number} activeSlide - The index number for the current slide.
 * @prop {array} messages - Text in the rotator. Supports HTML.
 * @prop {TypeEffects} effect - The transition effect type.
 * @prop {number} speed - How fast, in seconds, each slide lasts. Stop the rotator with 0.
 * @prop {'light' | 'dark'} polarity - Determines if the component has a dark or light background.
 * @prop {string} dom - The status of dom initalization.
 *
 * @cssproperty --kemet-rotator-transition-speed - How long, in css time units, the transition effect lasts.
 *
 * @fires kemet-rotator-mounted - Fired when the rotator is mounted to the DOM
 * @detail {HTMLElement} element - The rotator element
 *
 */

@customElement('kemet-rotator')
export default class KemetRotator extends LitElement {
  static styles = [unsafeCSS(styles)];

  @property({ type: Number, attribute: 'active-slide' })
  activeSlide: number = 0;

  @property({ type: Array })
  messages: string[] = [];

  @property({ type: String, reflect: true })
  effect: EnumEffects = EnumEffects.Fade;

  @property({ type: Number })
  speed: number = 3;

  @property({ type: String, reflect: true })
  polarity: 'light' | 'dark' = 'light';

  @property({ type: String, reflect: true })
  dom: string = 'initializing';

  @state()
  width: string = 'auto';

  @state()
  height: string = 'auto';

  @state()
  prevSlide!: number | null;

  firstUpdated() {
    // standard properties
    this.prevSlide = null;

    window.addEventListener('resize', this.setDimensions.bind(this));

    emitEvent(this, 'kemet-rotator-mounted', {
      bubbles: true,
      composed: true,
      detail: {
        element: this,
      },
    });
    this.dom = 'mounted';
  }

  updated(changed: Map<string, never>) {
    const widthHasChanged = !!changed.get('width');
    const heightHasChanged = !!changed.get('height');

    this.setDimensions();

    // only trigger slide updates when width and height has not changed
    if (!widthHasChanged && !heightHasChanged) {
      setTimeout(() => {
        if (this.speed > 0) {
          this.nextSlide();
        }
      }, this.speed * 1000);
    }
  }

  render() {
    const setWidth = this.effect === 'flip' ? `width:${this.width};` : '';
    const setHeight = this.effect === 'flip' ? `height:${this.height};` : '';

    console.log(this.height);

    return html`
      <span part="rotator" style="${setWidth} ${setHeight}">
        ${this.makeMessages()}
      </span>
    `;
  }

  makeMessages() {
    return this.messages.map((message, index) => {
      const setActiveClass = this.activeSlide === index ? 'active' : '';
      const setPrevClass = this.prevSlide === index ? 'previous' : '';

      return html`
        <span part="slide" class="${setActiveClass} ${setPrevClass}">
          ${unsafeHTML(message)}
        </span>
      `;
    });
  }

  setDimensions() {
    if (this.effect === 'flip') {
      this.width = `${this.offsetWidth}px`;

      const slides = this.shadowRoot?.querySelectorAll('[part="slide"]');
      let tallest = 0;

      slides?.forEach((slide: Element) => {
        if ((slide as HTMLElement).offsetHeight > tallest) {
          tallest = (slide as HTMLElement).offsetHeight;
        }
      });

      this.height = `${tallest}px`;
    }
  }

  /**
   * Rotates to the next slide.
   * @public
   * @method nextSlide
   * @returns {void}
   */
  nextSlide() {
    if (this.activeSlide < this.messages.length - 1) {
      this.activeSlide += 1;
      this.prevSlide = this.activeSlide - 1;
    } else {
      this.activeSlide = 0;
      this.prevSlide = this.messages.length - 1;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kemet-rotator': KemetRotator
  }
}
