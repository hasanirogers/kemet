import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type KemetTrackerStep from '../tracker-step';
import styles from './styles.css.ts';
import { emitEvent } from '../../utilities/events';

/**
 *
 * @since 1.2.0
 * @status stable
 *
 * @prop {number} total - The total number of steps
 * @prop {string} breakpoint - The point at which the tracker goes from mobile to standard * @prop {'light' | 'dark'} polarity - Determines if the component has a dark or light background
 * @prop {'light' | 'dark'} polarity - Determines if the component has a dark or light background
 * @prop {string} dom - The status of dom initalization.
 *
 * @fires kemet-tracker-mounted - Fired when the tracker is mounted to the DOM
 * @detail {HTMLElement} element - The tracker element
 *
 */

@customElement('kemet-tracker')
export default class KemetTracker extends LitElement {
  static styles = [styles];

  @property({ type: Number })
  total!: number;

  @property({ type: String })
  breakpoint!: string;

  @property({ type: String, reflect: true })
  polarity?: 'light' | 'dark';

  @property({ type: String, reflect: true })
  dom: string = 'initializing';

  @state()
  steps!: NodeListOf<KemetTrackerStep>;

  constructor() {
    super();
    this.breakpoint = '767px';
  }

  firstUpdated() {
    // elements
    this.steps = this.querySelectorAll('kemet-tracker-step');

    // methods exe
    this.isMobile();

    // events
    window.addEventListener('resize', () => {
      this.isMobile();
    });

    emitEvent(this, 'kemet-tracker-mounted', {
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
    this.total = this.steps.length;

    this.steps.forEach((step, index) => {
      step.step = index + 1;
      if (step.step === this.total) {
        step.last = true;
      }
    });
  }

  isMobile() {
    const mediaQuery = window.matchMedia(`(max-width: ${this.breakpoint})`);

    this.steps.forEach((step) => {
      step.mobile = mediaQuery.matches;
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kemet-tracker': KemetTracker
  }
}
