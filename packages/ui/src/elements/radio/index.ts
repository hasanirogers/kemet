import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { emitEvent } from '../../utilities/events';
import HTMLKemetRadiosElements from '../radios';
import styles from './styles.css.ts'

/**
 * @since 1.0.0
 * @status stable
 *
 * @tagname kemet-radio
 * @summary An enhanced radio button.
 *
 * @prop {string} label - The text next to the radio button
 * @prop {boolean} checked - Determines whether or not the button is checked
 * @prop {string} name - The name of the field
 * @prop {string} value - The value of the radio button
 * @prop {boolean} disabled - Determines if the button should be disabled
 * @prop {boolean} focused - Is true when the button is focused on
 * @prop {boolean} filled - Displayed the button as a filled button
 * @prop {'light' | 'dark'} polarity - Determines if the component has a dark or light background
 * @prop {string} dom - The status of dom initalization.
 *
 * @csspart label - The label that contains the radio button.
 * @csspart button - The radio button.
 * @csspart text - The text next to the radio button.
 * @csspart dot - The circle that fills the radio button.
 *
 * @cssproperty --kemet-radio-size - The size of the radio button.
 * @cssproperty --kemet-radio-border - The outer border of the radio button.
 * @cssproperty --kemet-radio-dot-color - The color of the radio button's dot.
 * @cssproperty --kemet-radio-dot-border-width - The border width of the radio button's dot.
 * @cssproperty --kemet-radio-dot-border-color - The border color of the radio button's dot.
 * @cssproperty --kemet-radio-dot-color-filled - The filled color of the radio button.
 * @cssproperty --kemet-radio-dot-ring-color - The ring color of the radio button's dot.
 *
 * @event kemet-radio-focus -  Fires when the checkbox receives focus
 * @event kemet-radio-blur - Fires when the checkbox loses focus
 *
 * @fires kemet-radio-mounted - Fired when the radio is mounted to the DOM
 * @detail {HTMLElement} element - The radio element
 *
 */

@customElement('kemet-radio')
export default class KemetRadio extends LitElement {
  static styles = [styles];

  @property({ type: String })
  label: string = '';

  @property({ type: Boolean, reflect: true })
  checked: boolean = false;

  @property({ type: String })
  name: string = '';

  @property({ type: String })
  value: string = '';

  @property({ type: Boolean, reflect: true })
  disabled: boolean = false;

  @property({ type: Boolean, reflect: true })
  focused: boolean = false;

  @property({ type: Boolean, reflect: true })
  filled: boolean = false;

  @property({ type: String, reflect: true })
  polarity?: 'light' | 'dark';

  @property({ type: String, reflect: true })
  dom: string = 'initializing';

  @state()
  input: HTMLInputElement = undefined as any;

  firstUpdated() {
    const radiosElement = this.closest('kemet-radios') as HTMLKemetRadiosElements;

    this.name = radiosElement.name || 'radio-button';
    this.input = this.shadowRoot?.querySelector('input') as HTMLInputElement;
    this.setAttribute('role', 'radio');

    if (this.checked) {
      this.setAttribute('aria-checked', 'true');
    } else {
      this.setAttribute('aria-checked', 'false');
    }

    emitEvent(this, 'kemet-radio-mounted', {
      bubbles: true,
      composed: true,
      detail: {
        element: this,
      },
    });
    this.dom = 'mounted';
  }

  render() {
    return html`
      <label part="label">
        <input
          type="radio"
          name=${ifDefined(this.name)}
          .value=${this.value}
          .checked=${live(this.checked)}
          .disabled=${this.disabled}
          @blur=${() => this.handleBlur()}
          @focus=${() => this.handleFocus()}
        />
        <button part="button" aria-label=${this.label}>${this.makeDot()}</button>
        <span part="text">${this.label}</span>
      </label>
    `;
  }

  /**
    * Simulates a click on the input element.
    * @public
    * @method click
    * @returns {void}
    */
  click() {
    this.input.click();
  }

  /**
   * Calls blur on the input element.
   * @public
   * @method blur
   * @returns {void}
   */
  blur(): void {
    this.input.blur();
  }

  /**
   * Calls focus on the input element.
   * @public
   * @method focus
   * @returns {void}
   */
  focus(): void {
    this.input.focus();
  }

  handleBlur() {
    this.focused = false;
    emitEvent(this, 'kemet-radio-blur', { element: this });
  }

  handleFocus() {
    this.focused = true;
    emitEvent(this, 'kemet-radio-focus', { element: this });
  }

  makeDot() {
    if (this.checked) {
      return html`
        <span part="dot"></span>
      `;
    }

    return null;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kemet-radio': KemetRadio
  }
}
