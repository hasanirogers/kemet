import { html, LitElement, unsafeCSS, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import styles from './styles.css?inline';
import { emitEvent } from '../../utilities/events';

export enum EnumFormats {
  Seconds = 'seconds',
  Minutes = 'minutes',
  Hours = 'hours',
  Days = 'days'
}

/**
 * @since 3.1.0
 * @status stable
 *
 * @tagname kemet-timer
 * @summary Counts down from a specified amount of time or date.
 *
 * @prop {TypeFormats} format - The format of the amount property
 * @prop {number} amount - The amount of time to set the timer
 * @prop {string} expires - Begins a count down to a specified time, accepts a string that matches value given for a Date constructor
 * @prop {'light' | 'dark'} polarity - Determines if the component has a dark or light background
 * @prop {string} dom - The status of dom initalization.
 *
 * @event kemet-timer-start - Fires when the timer starts
 * @event kemet-timer-complete - Fires when the timer reaches 0
 * @event kemet-timer-increment - Fires on tick of the timer
 *
 * @fires kemet-timer-mounted - Fired when the timer is mounted to the DOM
 * @detail {HTMLElement} element - The timer element
 *
 */

@customElement('kemet-timer')
export default class KemetTimer extends LitElement {
  static styles = [unsafeCSS(styles)];

  @property({ type: String })
  format: EnumFormats = EnumFormats.Seconds;

  @property({ type: Number })
  amount: number = 10;

  @property({ type: String })
  expires!: string;

  @property({ type: String, reflect: true })
  polarity?: 'light' | 'dark';

  @property({ type: String, reflect: true })
  dom: string = 'initializing';

  /** @internal */
  @state()
  interval!: any;

  firstUpdated() {
    if (this.expires) {
      this.countDown();
    } else {
      this.timer(this.getTimeInSeconds(this.amount));
    }

    emitEvent(this, 'kemet-timer-start', { element: this });
    emitEvent(this, 'kemet-timer-increment', { element: this, timeleft: this.getTimeInSeconds(this.amount) });

    emitEvent(this, 'kemet-timer-mounted', {
      bubbles: true,
      composed: true,
      detail: {
        element: this,
      },
    });
    this.dom = 'mounted';
  }

  updated(prevProps: PropertyValues<this>) {
    const hasFormatOrAmountChanged = prevProps.get('format') || prevProps.get('amount');
    const hasExpiredChanged = prevProps.get('expires');

    if (hasFormatOrAmountChanged) {
      clearInterval(this.interval);
      this.timer(this.getTimeInSeconds(this.amount));
    }

    if (hasExpiredChanged) {
      clearInterval(this.interval);
      this.countDown();
    }
  }

  render() {
    return html`<slot></slot>`;
  }

  getTimeInSeconds(time: number): number {
    switch (this.format) {
      case 'minutes': return time * 60;
      case 'hours': return time * 60 * 60;
      case 'days': return time * 60 * 60 * 24;
      default: return time;
    }
  }

  timer(seconds: number = 0) {
    const now = Date.now();
    const then = now + seconds * 1000;

    this.interval = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000);

      if (secondsLeft < 0) {
        clearInterval(this.interval);
        emitEvent(this, 'kemet-timer-complete', { element: this });
        return;
      }

      emitEvent(this, 'kemet-timer-increment', { element: this, timeleft: secondsLeft });
    }, 1000);
  }

  countDown() {
    const expires = new Date(this.expires).getTime();

    this.interval = setInterval(() => {
      const secondsLeft = Math.round((expires - Date.now()) / 1000);

      if (secondsLeft < 0) {
        clearInterval(this.interval);
        emitEvent(this, 'kemet-timer-complete', { element: this });
        return;
      }

      emitEvent(this, 'kemet-timer-increment', { element: this, timeleft: secondsLeft });
    }, 1000);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kemet-timer': KemetTimer
  }
}
