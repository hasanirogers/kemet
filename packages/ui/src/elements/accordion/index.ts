import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import HTMLKemetAccordionPanelElement from '../accordion-panel';
import styles from './styles.css?inline';
import { emitEvent } from '../../utilities/events';

/**
 * @since 1.0.0
 * @status stable
 *
 * @tagname kemet-accordion
 * @summary A component that acts like a standard accordion.
 *
 * @prop {number} currentPanel - The index value for the most recently opened panel
 * @prop {boolean} togglePanels - Support for closing all inactive panels when one is opened
 *
 * @fires kemet-accordion-mounted - Fired when the accordion is mounted to the DOM
 * @detail {HTMLElement} element - The accordion element
 */

@customElement('kemet-accordion')
export default class KemetAccordion extends LitElement {
  static styles = [unsafeCSS(styles)];

  @property({ type: Number, attribute: 'current-panel' })
  currentPanel: number = 0;

  @property({ type: Boolean, attribute: 'toggle-panels' })
  togglePanels: boolean = false;

  @property({ type: String, reflect: true })
  dom: string = 'initializing';

  @property({ type: String, reflect: true })
  polarity: 'light' | 'dark' = 'light';

  panels!: NodeListOf<HTMLKemetAccordionPanelElement>;

  @state()
  onKeyDown!: (event: KeyboardEvent) => void;

  @state()
  currentPanelFocus!: number;

  handlePanelOpenedBound!: (event: Event) => void;

  constructor() {
    super();
    this.handlePanelOpenedBound = this.handlePanelOpened.bind(this);
    this.addEventListener('kemet-opened', this.handlePanelOpenedBound);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('kemet-opened', this.handlePanelOpenedBound);
    this.panels?.forEach((panel) => {
      panel.removeEventListener('keydown', this.onKeyDown);
    });
  }

  firstUpdated() {
    this.onKeyDown = event => this.handleKeyDown(event);
    emitEvent(this, 'kemet-accordion-mounted', {
      bubbles: true,
      composed: true,
      detail: {
        element: this,
      },
    });
    this.dom = 'mounted';
  }

  render() {
    return html`<slot @slotchange=${() => this.handleSlotChange()}></slot>`;
  }

  handleSlotChange() {
    const newPanels = this.querySelectorAll('kemet-accordion-panel');

    // Remove listeners from panels that are no longer in the DOM
    if (this.panels) {
      this.panels.forEach((oldPanel) => {
        if (!Array.from(newPanels).includes(oldPanel)) {
          oldPanel.removeEventListener('keydown', this.onKeyDown);
        }
      });
    }

    this.panels = newPanels;

    this.panels.forEach((panel: HTMLKemetAccordionPanelElement, index) => {
      panel.index = index;
      panel.addEventListener('keydown', this.onKeyDown);
    });
  }

  handlePanelOpened(event: Event) {
    const customEvent = event as CustomEvent;
    this.panels?.forEach((panel: HTMLKemetAccordionPanelElement) => {
      if (panel === customEvent.detail) {
        this.currentPanel = panel.index;
      }
    });

    if (this.togglePanels) {
      this.panels?.forEach((panel: HTMLKemetAccordionPanelElement) => {
        if (panel !== customEvent.detail.element) {
          panel.opened = false;
        }
      });
    }
  }

  navigatePanels(direction: string) {
    switch (direction) {
      case 'home':
        this.currentPanel = 0;
        break;
      case 'end':
        this.currentPanel = this.panels.length - 1;
        break;
      case 'next':
        this.currentPanel += 1;
        break;
      case 'prev':
        this.currentPanel -= 1;
        break;
      default:
        this.currentPanelFocus = 0;
        break;
    }

    if (this.currentPanel > this.panels.length - 1) this.currentPanel = 0;
    if (this.currentPanel < 0) this.currentPanel = this.panels.length - 1;

    this.panels[this.currentPanel]?.shadowRoot?.querySelector('button')?.focus();
  }

  handleKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLElement;
    switch (event.key) {
      case 'Enter':
      case 'Space':
        event.preventDefault();
        target.click();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        this.navigatePanels('prev');
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        this.navigatePanels('next');
        break;
      case 'End':
        event.preventDefault();
        this.navigatePanels('end');
        break;
      case 'Home':
        event.preventDefault();
        this.navigatePanels('home');
        break;
      default:
        break;
    }
  }

  /**
   * Expands all panels in the accordion
   * @public
   * @method expandAll
   * @returns {void}
   */
  expandAll(): void {
    this.panels.forEach((panel) => {
      panel.opened = true;
    });
  }

  /**
   * Collapses all panels in the accordion
   * @public
   * @method collapseAll
   * @returns {void}
   */
  collapseAll(): void {
    this.panels.forEach((panel) => {
      panel.opened = false;
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kemet-accordion': KemetAccordion
  }
}
