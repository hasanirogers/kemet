import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EnumFormats } from '../timer';
import styles from './styles.css.ts';
import { emitEvent } from '../../utilities/events';

/**
 * @since 3.1.0
 * @status stable
 *
 * @tagname kemet-timer-display
 * @summary Displays remaining time
 *
 * @prop {EnumFormats} format - The format to display the remaining time in
 * @prop {'light' | 'dark'} polarity - Determines if the component has a dark or light background
 * @prop {string} dom - The status of dom initalization.
 *
 * @fires kemet-timer-display-mounted - Fired when the timer display is mounted to the DOM
 * @detail {HTMLElement} element - The timer display element
 */

@customElement('kemet-timer-display')
export default class KemetTimerDisplay extends LitElement {
  static styles = [styles];

  @property({ type: String })
  format: EnumFormats = EnumFormats.Seconds;

  @state()
  displayTime!: string;

  @property({ type: String, reflect: true })
  polarity?: 'light' | 'dark';

  @property({ type: String, reflect: true })
  dom: string = 'initializing';

  constructor() {
    super();
    this.getTime();
  }

  firstUpdated() {
    emitEvent(this, 'kemet-timer-display-mounted', {
      bubbles: true,
      composed: true,
      detail: {
        element: this,
      },
    });
    this.dom = 'mounted';
  }

  render() {
    return html`${this.displayTime}`;
  }

  getTime() {
    this.closest('kemet-timer')?.addEventListener('kemet-timer-increment', (event: Event) => {
      const secondsLeft = (event as CustomEvent).detail.timeleft;
      switch (this.format) {
        case 'seconds':
          this.displayTime = (secondsLeft % 60 < 10 ? `0${secondsLeft % 60}` : secondsLeft % 60).toString();
          break;
        case 'minutes':
          this.displayTime = Math.floor((secondsLeft % 86400) % 3600 / 60).toString();
          break;
        case 'hours':
          this.displayTime = Math.floor((secondsLeft % 86400) / 3600).toString();
          break;
        case 'days':
          this.displayTime = Math.floor(secondsLeft / 86400).toString();
          break;
        default:
          this.displayTime = (secondsLeft % 60 < 10 ? `0${secondsLeft % 60}` : secondsLeft % 60).toString();
      }
    });
  }

  getTimeInSeconds(time: number) {
    switch (this.format) {
      case 'minutes': return time * 60;
      case 'hours': return time * 60 * 60;
      case 'days': return time * 60 * 60 * 24;
      default: return time;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kemet-timer-display': KemetTimerDisplay
  }
}
