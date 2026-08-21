import { html, LitElement, unsafeCSS, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { FormSubmitController } from '../../utilities/form-controller';
import { emitEvent } from '../../utilities/events';
import { EnumAppearances, EnumRoundedSizes } from '../../utilities/constants';
import HTMLKemetFieldElement from '../field';
import type HTMLKemetOptionElement from '../select-option';
import '../icon';
import styles from './styles.css?inline';

interface IOptions {
  label: string;
  value: string;
  disabled: boolean;
  selected: boolean;
}

/**
 * @since 1.0.0
 * @status stable
 *
 * @tagname kemet-select
 * @summary An enhanced select element.
 *
 * @prop {string} slug - A string the uniquely identifies the select
 * @prop {string} name - The name of the select
 * @prop {string} value - The value of the select
 * @prop {array} options - The options the select contains
 * @prop {EnumAppearances} appearance - The status of the select
 * @prop {boolean} required - Determines whether the field is required
 * @prop {boolean} disabled - Determines whether the field is disabled
 * @prop {boolean} multiple - Support of multiple choice selections
 * @prop {string} icon - The dropdown icon
 * @prop {number} iconSize - The dropdown icon size
 * @prop {boolean} filled - Displays a filled select
 * @prop {EnumRoundedSizes} rounded - Displays rounded corners
 * @prop {'light' | 'dark'} polarity - Determines if the component has a dark or light background
 * @prop {string} dom - The status of dom initalization.
 *
 * @csspart select
 * @csspart option
 *
 * @cssproperty --kemet-select-padding - The padding on the textarea.
 * @cssproperty --kemet-select-border - The border of the textarea.
 * @cssproperty --kemet-select-border-color-error - The border of the error state.
 * @cssproperty --kemet-select-border-color-success - The border of the success state.
 * @cssproperty --kemet-select-border-color-warning - The border of the warning state.
 * @cssproperty --kemet-select-border-radius-rounded - The border radius on rounded.
 * @cssproperty --kemet-select-border-filled - The border on filled.
 * @cssproperty --kemet-select-color-filled - The color on filled.
 * @cssproperty --kemet-select-background-color-filled - The background-color on filled.
 * @cssproperty --kemet-select-background-color-error - The error state background color.
 * @cssproperty --kemet-select-background-color-success - The success state background color.
 * @cssproperty --kemet-select-background-color-warning - The warning state background color.
 * @cssproperty --kemet-select-icon-right - The space on the right of the icon.
 *
 * @fires kemet-select-mounted - Fires when the select is mounted
 * @fires kemet-select-focus - Fires when the input receives focus
 * @fires kemet-select-blur - Fires when the input loses focus
 * @fires kemet-select-appearance-change - Fires when there's a change in appearance
 * @fires kemet-select-change - Fires when the select input changes
 *
 */

@customElement('kemet-select')
export default class KemetSelect extends LitElement {
  formSubmitController: FormSubmitController;

  static styles = [unsafeCSS(styles)];

  @property({ type: String })
  slug: string = '';

  @property({ type: String })
  name: string = 'select';

  @property({ type: String })
  value: string = '';

  @property({ type: Array })
  options: IOptions[] = [];

  @property({ type: String, reflect: true })
  appearance: string = '';

  @property({ type: Boolean, reflect: true })
  required: boolean = false;

  @property({ type: Boolean, reflect: true })
  disabled: boolean = false;

  @property({ type: Boolean })
  multiple: boolean = false;

  @property({ type: String })
  icon: string = 'chevron-down';

  @property({ type: Number, attribute: 'icon-size' })
  iconSize: number = 18;

  @property({ type: Boolean, reflect: true })
  filled: boolean = false;

  @property({ reflect: true })
  rounded?: EnumRoundedSizes;

  @property({ type: String, reflect: true })
  polarity: 'light' | 'dark' = 'light';

  @property({ type: String, reflect: true })
  dom: string = 'initializing';

  @state()
  invalid: boolean = false;

  @state()
  control!: HTMLKemetFieldElement;

  @state()
  select!: HTMLSelectElement;

  @state()
  selectedOption!: HTMLOptionElement;

  @state()
  optionElements!: NodeListOf<HTMLKemetOptionElement>;

  @state()
  hasFocus: boolean = false;

  constructor() {
    super();

    /** @internal */
    this.formSubmitController = new FormSubmitController(this);

    /** @internal */
    this.control = this.closest('kemet-field') as HTMLKemetFieldElement;
  }

  firstUpdated() {
    this.select = this.shadowRoot?.querySelector('select') as HTMLSelectElement;
    this.selectedOption = this.querySelector('[selected]') as HTMLOptionElement;
    this.value = this.selectedOption ? this.selectedOption.value : '';

    emitEvent(this, 'kemet-select-mounted', {
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
      <select
        part="select"
        id=${this.slug}
        name=${this.name}
        ?required=${this.required}
        ?disabled=${this.disabled}
        ?multiple=${this.multiple}
        @change=${this.handleChange}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
        @invalid=${this.handleInvalid}
      >
        ${this.makeOptions()}
      </select>
      ${this.makeIcon()}
      <slot @slotchange=${() => this.makeOptions()}></slot>
    `;
  }

  /**
   * Generates the option elements
   * @private
   * @returns {TemplateResult} An option element
   */
  makeOptions(): TemplateResult<1>[] {
    this.options = [];
    this.optionElements = this.querySelectorAll('kemet-select-option');

    this.optionElements.forEach((option: HTMLKemetOptionElement) => {
      this.options = this.options.concat({
        label: option.label,
        value: option.value,
        disabled: option.disabled,
        selected: option.selected,
      });
    });

    return this.options.map(
      option => html`<option part="option" value=${option.value} ?disabled=${option.disabled} ?selected=${option.selected}>
        ${option.label}
      </option>`,
    );
  }

  /**
   * Generates a dropdown icon
   * @private
   */
  makeIcon() {
    if (this.icon || this.icon !== '') {
      return html`<kemet-icon name=${this.icon} size=${this.iconSize}></kemet-icon>`;
    }

    return null;
  }

  /**
   * Handles when the input receives focus
   * @private
   */
  handleFocus() {
    this.hasFocus = true;
    emitEvent(this, 'kemet-select-focus', { focused: true, element: this });
  }

  /**
   * Handles when the input loses focus
   * @private
   */
  handleBlur() {
    this.hasFocus = false;
    emitEvent(this, 'kemet-select-blur', { focused: false, element: this });

    this.select.checkValidity();

    if (!this.select.checkValidity()) {
      this.invalid = true;
      this.appearance = EnumAppearances.Error;
      this.control.appearance = EnumAppearances.Error;

      emitEvent(this, 'kemet-select-appearance-change', {
        status: EnumAppearances.Error,
        validity: this.select.validity,
        element: this,
      });
    }
  }

  /**
   * Handles when the input changes value
   * @private
   */
  handleChange(event: Event) {
    this.value = this.select.value;
    emitEvent(this, 'kemet-select-change', {
      appearance: this.appearance,
      validity: this.select.validity,
      element: this,
      value: (event.target as HTMLSelectElement).value,
    });

    if (this.select.checkValidity()) {
      this.invalid = false;
      // this.appearance = EnumAppearances.Neutral;

      emitEvent(this, 'kemet-select-appearancce-change', {
        appearance: EnumAppearances.Neutral,
        validity: this.select.validity,
        element: this,
        value: (event.target as HTMLSelectElement).value,
      });
    }
  }

  /**
   * Handles when the input has an error
   * @private
   */
  handleInvalid() {
    this.invalid = true;
    this.appearance = EnumAppearances.Error;

    emitEvent(this, 'kemet-select-appearance-change', {
      appearance: EnumAppearances.Error,
      validity: this.select.validity,
      element: this,
    });
  }

  /**
   * Checks the validity of the standard select
   * @public
   * @returns {boolean}
   */
  checkValidity(): boolean {
    return this.select.checkValidity();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kemet-select': KemetSelect
  }
}
