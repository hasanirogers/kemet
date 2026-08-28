import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { FormSubmitController } from '../../utilities/form-controller';
import { emitEvent } from '../../utilities/events';
import { EnumAppearances } from '../../utilities/constants';
import styles from './styles.css.ts';

/**
 * @since 1.0.0
 * @status stable
 *
 * @tagname kemet-checkbox
 * @summary An enhanced checkbox.
 *
 * @prop {string} label - Label text for the checkbox
 * @prop {boolean} checked - Determines if the checkbox is selected
 * @prop {boolean} indeterminate - An indeterminate selection status
 * @prop {string} name - Name of the checkbox
 * @prop {string} value - Value of the checkbox
 * @prop {boolean} disabled - Determines if a checkbox is disabled
 * @prop {boolean} required - Determines if a checkbox is required
 * @prop {boolean} focused - Is true when the checkbox is focused
 * @prop {boolean} rounded - Gives the checkbox rounded edges
 * @prop {boolean} filled - Fills the checkbox with color
 * @prop {EnumAppearances} appearance - The status of the checkbox
 * @prop {string} message - Message associated with checkbox status
 * @prop {'light' | 'dark'} polarity - Determines if the component has a dark or light background
 * @prop {string} dom - The status of dom initalization.
 *
 * @csspart label - The label element.
 * @csspart text - The label's text.
 * @csspart mark - The icon of the check mark.
 *
 * @cssproperty --kemet-checkbox-size - The width and height of the checkbox.
 * @cssproperty --kemet-checkbox-color - The color of the checkbox mark.
 * @cssproperty --kemet-checkbox-border - The border of the checkbox.
 * @cssproperty --kemet-checkbox-border-radius - The border radius of the checkbox.
 * @cssproperty --kemet-checkbox-filled-color - The filled color of the checkbox mark.
 * @cssproperty --kemet-checkbox-filled-background-color - The filled background color.
 *
 * @fires kemet-change - Fires when the state of the checkbox changes
 * @details {KemetCheckbox} element - The checkbox element
 *
 * @fires kemet-focus - Fires when the checkbox receives focus
 * @details {KemetCheckbox} element - The checkbox element
 *
 * @fires kemet-blur - Fires when the checkbox loses focus
 * @details {KemetCheckbox} element - The checkbox element
 *
 * @fires kemet-checkbox-mounted - Fires when the checkbox is mounted to the dom
 * @details {KemetCheckbox} element -The checkbox element
 *
 */

@customElement('kemet-checkbox')
export default class KemetCheckbox extends LitElement {
  /** @internal */
  formSubmitController: FormSubmitController;

  static styles = [styles];

  @property({ type: String })
  label: string = '';

  @property({ type: Boolean, reflect: true })
  checked: boolean = false;

  @property({ type: Boolean, reflect: true })
  indeterminate: boolean = false;

  @property({ type: String })
  name: string = 'checkbox';

  @property({ type: Boolean })
  value: boolean = false;

  @property({ type: Boolean, reflect: true })
  disabled: boolean = false;

  @property({ type: Boolean, reflect: true })
  required: boolean = false;

  @property({ type: Boolean, reflect: true })
  focused: boolean = false;

  @property({ type: Boolean, reflect: true })
  rounded: boolean = false;

  @property({ type: Boolean, reflect: true })
  filled: boolean = false;

  @property({ type: String, reflect: true })
  appearance!: EnumAppearances;

  @property({ type: String })
  message: string = '';

  @property({ type: String, reflect: true })
  polarity?: 'light' | 'dark';

  @property({ type: String, reflect: true })
  dom: string = 'initializing';

  @query('input')
  input!: HTMLInputElement;

  firstUpdated() {
    emitEvent(this, 'kemet-checkbox-mounted', {
      bubbles: true,
      composed: true,
      detail: {
        element: this,
      },
    });
    this.dom = 'mounted';
  }

  constructor() {
    super();
    /** @internal */
    this.formSubmitController = new FormSubmitController(this);
  }

  render() {
    return html`
      <label part="label">
        <input
          type="checkbox"
          name=${ifDefined(this.name)}
          .value=${this.value}
          .indeterminate=${live(this.indeterminate)}
          .checked=${live(this.checked)}
          .disabled=${this.disabled}
          .required=${this.required}
          aria-checked=${this.checked ? 'true' : 'false'}
          @click=${() => this.handleClick()}
          @blur=${() => this.handleBlur()}
          @focus=${() => this.handleFocus()}
          @change=${() => this.handleChange()}
        />
        <button part="checkbox" aria-label=${this.label}>
          ${this.makeCheckMark()}
        </button>
        <span part="text">${this.label}</span>
      </label>
      ${this.makeMessage()}
    `;
  }

  /**
   * Simulates a click on the input element.
   * @public
   * @method click
   * @returns {void}
   */
  click(): void {
    this.input.click();
  }

  handleClick() {
    this.checked = !this.checked;
    this.indeterminate = false;
    emitEvent(this, 'kemet-change', { element: this });
  }

  handleBlur() {
    this.focused = false;
    emitEvent(this, 'kemet-blur', { element: this });
  }

  handleFocus() {
    this.focused = true;
    emitEvent(this, 'kemet-focus', { element: this });
  }

  handleChange() {
    this.value = this.checked;
  }

  makeMessage() {
    if (this.appearance === EnumAppearances.Error || this.appearance === EnumAppearances.Warning) {
      return html`<span part="message">${this.message}</span>`;
    }

    return null;
  }

  makeCheckMark() {
    if (this.checked) {
      return html`
        <span part="mark">
          <svg viewBox="0 0 16 16">
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
              <g stroke="currentColor" stroke-width="2">
                <g transform="translate(3.428571, 3.428571)">
                  <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
                  <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
                </g>
              </g>
            </g>
          </svg>
        </span>
      `;
    }

    if (!this.checked && this.indeterminate) {
      return html`
        <span part="mark">
          <svg viewBox="0 0 16 16">
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
              <g stroke="currentColor" stroke-width="2">
                <g transform="translate(2.285714, 6.857143)">
                  <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
                </g>
              </g>
            </g>
          </svg>
        </span>
      `;
    }

    return null;
  }

  checkValidity() {
    return this.input.checkValidity();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kemet-checkbox': KemetCheckbox
  }
}
