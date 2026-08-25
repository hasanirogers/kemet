import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { FormSubmitController } from '../../utilities/form-controller';
import HTMLKemetFieldElement from '../field';
import { EnumAppearances, EnumRoundedSizes } from '../../utilities/constants';
import { emitEvent } from '../../utilities/events';
import styles from './styles.css?inline';

/**
 * @since 1.0.0
 * @status stable
 *
 * @tagname kemet-textarea
 * @summary An enhanced textarea element.
 *
 * @prop {string} slug
 * @prop {string}  name
 * @prop {string}  placeholder
 * @prop {number}  minlength
 * @prop {number}  maxlength
 * @prop {string}  inputmode
 * @prop {boolean}  disabled
 * @prop {boolean}  readonly
 * @prop {boolean}  required
 * @prop {string}  value
 * @prop {boolean}  invalid
 * @prop {EnumAppearances}  appearance
 * @prop {boolean}  validateOnBlur
 * @prop {EnumRoundedSizes}  rounded
 * @prop {boolean}  filled
 * @prop {number}  rows
 * @prop {boolean} autocorrect
 * @prop {'light' | 'dark'} polarity - Determines if the component has a dark or light background
 * @prop {string} dom - The status of dom initalization.
 *
 *
 * @csspart textarea
 *
 * @cssproperty --kemet-textarea-padding - The padding on the textarea.
 * @cssproperty --kemet-textarea-border - The border of the textarea.
 * @cssproperty --kemet-textarea-border-color-error - The border of the error state.
 * @cssproperty --kemet-textarea-border-color-success - The border of the success state.
 * @cssproperty --kemet-textarea-border-color-warning - The border of the warning state.
 * @cssproperty --kemet-textarea-border-radius-rounded - The border radius on rounded.
 * @cssproperty --kemet-textarea-border-filled - The border on filled.
 * @cssproperty --kemet-textarea-color-filled - The color on filled.
 * @cssproperty --kemet-textarea-background-color-filled - The background-color on filled.
 * @cssproperty --kemet-textarea-background-color-error - The error state background color.
 * @cssproperty --kemet-textarea-background-color-success - The success state background color.
 * @cssproperty --kemet-textarea-background-color-warning - The warning state background color.
 *
 * @fires kemet-textarea-focused - Fired when the textarea is focused or blurred
 * @detail {boolean} focused - Whether the textarea is focused
 *
 * @fires kemet-textarea-input - Fired when the textarea receives input
 * @detail {string} value - The value of the textarea
 *
 * @fires kemet-textarea-appearance-change - Fired when the textarea appearance changes
 * @detail {EnumAppearances} appearance - The appearance of the textarea
 *
 * @fires kemet-textarea-mounted - Fired when the textarea is mounted to the DOM
 * @detail {HTMLElement} element - The textarea element
 *
 */

@customElement('kemet-textarea')
export default class HTMLKemetTextareaElement extends LitElement {
  formSubmitController: FormSubmitController;

  static styles = [unsafeCSS(styles)];

  @property({ type: String })
  slug: string = 'textarea';

  @property({ type: String })
  name: string = 'textarea';

  @property({ type: String })
  placeholder?: string;

  @property({ type: Number })
  minlength?: number;

  @property({ type: Number })
  maxlength?: number;

  @property({ type: String })
  inputmode?: string;

  @property({ type: Boolean })
  autofocus: boolean = false;

  @property({ type: Boolean, reflect: true })
  disabled?: boolean;

  @property({ type: Boolean })
  readonly?: boolean;

  @property({ type: Boolean, reflect: true })
  required?: boolean;

  @property({ type: String })
  value: string = '';

  @property({ type: Boolean, reflect: true })
  invalid?: boolean;

  @property({ type: String, reflect: true })
  appearance?: EnumAppearances;

  @property({ type: Number })
  rows: number = 4;

  @property({ type: Boolean, attribute: 'validate-on-blur' })
  validateOnBlur?: boolean;

  @property({ type: Boolean, reflect: true })
  filled?: boolean;

  @property({ reflect: true })
  rounded?: EnumRoundedSizes;

  @property({ type: Boolean })
  autocorrect: boolean = false;

  @state()
  form!: HTMLFormElement;

  @state()
  control!: HTMLKemetFieldElement;

  @state()
  textarea!: HTMLTextAreaElement;

  @state()
  hasFocus!: boolean;

  @state()
  validity!: ValidityState;

  @property({ type: String, reflect: true })
  polarity: 'light' | 'dark' = 'light';

  @property({ type: String, reflect: true })
  dom: string = 'initializing';

  constructor() {
    super();

    /** @internal */
    this.formSubmitController = new FormSubmitController(this);
  }

  firstUpdated() {
    // elements
    this.form = this.closest('form') as HTMLFormElement;
    this.control = this.closest('kemet-field') as HTMLKemetFieldElement;
    this.textarea = this.shadowRoot?.querySelector('textarea') as HTMLTextAreaElement;

    emitEvent(this, 'kemet-textarea-mounted', {
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
      <textarea
        part="textarea"
        id=${this.slug}
        name=${this.name}
        .value=${live(this.value)}
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}
        ?required=${this.required}
        placeholder=${ifDefined(this.placeholder)}
        rows=${ifDefined(this.rows)}
        minlength=${ifDefined(this.minlength)}
        maxlength=${ifDefined(this.maxlength)}
        autocorrect=${ifDefined(this.autocorrect)}
        ?autofocus=${this.autofocus}
        spellcheck=${ifDefined(this.spellcheck)}
        inputmode=${ifDefined(this.inputmode)}
        @change=${this.handleChange}
        @input=${this.handleInput}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
        @invalid=${this.handleInvalid}
      ></textarea>
    `;
  }

  /**
   * Handles when the textarea receives focus
   * @private
   */
  handleFocus() {
    this.hasFocus = true;

    /**
     * Fires when the input receives and loses focus
     */
    this.dispatchEvent(
      new CustomEvent('kemet-textarea-focused', {
        bubbles: true,
        composed: true,
        detail: { focused: true, element: this },
      }),
    );
  }

  /**
   * Handles when the textarea loses focus
   * @private
   */
  handleBlur() {
    this.hasFocus = false;

    /**
     * Fires when the input receives and loses focus
     */
    this.dispatchEvent(
      new CustomEvent('kemet-textarea-focused', {
        bubbles: true,
        composed: true,
        detail: { focused: false, element: this },
      }),
    );

    if (this.validateOnBlur && this.form) {
      this.textarea.checkValidity();
      this.validity = this.textarea.validity;
    }
  }

  /**
   * Handles when the textarea changes value
   * @private
   */
  handleChange() {
    this.value = this.textarea.value;

    if (this.textarea.checkValidity() && this.checkLimitValidity()) {
      this.invalid = false;
      this.validity = this.textarea.validity;

      /**
       * Fires when there's a change in status
       */
      this.dispatchEvent(
        new CustomEvent('kemet-textarea-appearance-change', {
          bubbles: true,
          composed: true,
          detail: {
            appearance: EnumAppearances.Neutral,
            validity: this.textarea.validity,
            element: this,
          },
        }),
      );
    }
  }

  /**
   * Handles when the textarea receives input
   * @private
   */
  handleInput() {
    this.value = this.textarea.value;

    /**
     * Fires when the input receives input
     */
    this.dispatchEvent(
      new CustomEvent('kemet-textarea-input', {
        bubbles: true,
        composed: true,
        detail: { value: this.value, element: this },
      }),
    );
  }

  /**
   * Handles when the textarea has an error
   * @private
   */
  handleInvalid() {
    this.validity = this.textarea.validity;

    if (this.validateOnBlur) {
      this.invalid = true;
      this.appearance = EnumAppearances.Error;

      /**
       * Fires when there's a change in status
       */
      this.dispatchEvent(
        new CustomEvent('kemet-textarea-appearance-change', {
          bubbles: true,
          composed: true,
          detail: {
            appearance: EnumAppearances.Error,
            validity: this.textarea.validity,
            element: this,
          },
        }),
      );
    }
  }

  /**
   * Checks the validity of the character limit for the count component
   * @private
   * @returns {boolean}
   */
  checkLimitValidity(): boolean {
    if (this.control) {
      const count = this.control.querySelector('kemet-count');
      if (count) {
        return this.value.length < count.limit;
      }
    }

    return true;
  }

  /**
   * Checks the validity of the standard input
   * @public
   * @returns {boolean}
   */
  checkValidity(): boolean {
    return this.textarea.checkValidity();
  }

  /**
   * Focuses the standard input
   * @public
   */
  focus() {
    return this.textarea.focus();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kemet-textarea': HTMLKemetTextareaElement
  }
}
