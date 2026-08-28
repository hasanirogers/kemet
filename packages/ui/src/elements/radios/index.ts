import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { FormSubmitController } from '../../utilities/form-controller';
import { emitEvent } from '../../utilities/events';
import { EnumAxis, EnumAppearances } from '../../utilities/constants';
import type HTMLKemetRadioElement from '../radio';
import styles from './styles.css.ts'


/**
 * @since 1.0.0
 * @status stable
 *
 * @tagname kemet-radios
 * @summary A group of radio buttons.
 *
 * @prop {string} legend - The legend text for the fieldset
 * @prop {TypeAxis} axis - The direction of the button's layout
 * @prop {string} value - The value of the selected radio button
 * @prop {string} name - The name of the radio button set
 * @prop {EnumAppearances} appearance - The appearance of the radio button set
 * @prop {string} message - Validation message for the user
 * @prop {boolean} required - Determines whether the radio button set is required
 * @prop {'light' | 'dark'} polarity - Determines if the component has a dark or light background
 * @prop {string} dom - The status of dom initalization.
 *
 * @csspart fieldset - The fieldset element.
 * @csspart legend - The legend element.
 *
 * @event kemet-radios-change - Fires when the state of the checkbox changes
 *
 * @fires kemet-radios-mounted - Fired when the radios is mounted to the DOM
 * @detail {HTMLElement} element - The radios element
 *
 */

@customElement('kemet-radios')
export default class KemetRadios extends LitElement {
  formSubmitController: FormSubmitController;

  static styles = [styles];

  @property({ type: String })
  legend: string = '';

  @property({ type: String, reflect: true })
  axis: EnumAxis = EnumAxis.Horizontal;

  @property({ type: String })
  value!: string;

  @property({ type: String })
  name: string = 'radios';

  @property({ type: String, reflect: true })
  appearance: EnumAppearances = EnumAppearances.Neutral;

  @property({ type: String })
  message!: string;

  @property({ type: Boolean })
  required!: boolean;

  @property({ type: String, reflect: true })
  polarity?: 'light' | 'dark';

  @property({ type: String, reflect: true })
  dom: string = 'initializing';

  @state()
  radios!: NodeListOf<HTMLKemetRadioElement>;

  constructor() {
    super();

    /** @internal */
    this.formSubmitController = new FormSubmitController(this);
  }

  firstUpdated() {
    this.radios = this.querySelectorAll('kemet-radio');
    this.setAttribute('role', 'radiogroup');

    emitEvent(this, 'kemet-radios-mounted', {
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
      <fieldset part="fieldset">
        ${this.legend !== '' ? html`<legend part="legend">${this.legend}</legend>` : null}
        <slot @click=${(event: MouseEvent) => this.handleClick(event)} @keydown=${(event: KeyboardEvent) => this.handleKeyDown(event)} @slotchange=${() => this.handleSlotChange()}></slot>
      </fieldset>
      ${this.makeMessage()}
    `;
  }

  handleClick(event: MouseEvent) {
    const target = event.target as HTMLKemetRadioElement;

    this.radios.forEach((radio) => {
      radio.checked = false;
      radio.tabIndex = radio === target ? 0 : -1;
      radio.setAttribute('aria-checked', 'false');
    });

    if (!target.disabled) {
      target.checked = true;
      target.setAttribute('aria-checked', 'true');
      this.value = target.value;
      this.appearance = EnumAppearances.Neutral;

      emitEvent(this, 'kemet-radios-change', this);
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    const radios = Array.from(this.radios);
    const arrowKeys = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'];
    const forwardKeys = ['ArrowRight', 'ArrowDown'];
    const shift: number = forwardKeys.includes(event.key) ? 1 : -1;
    const checkedIndex: number | HTMLKemetRadioElement = radios.findIndex((radio: HTMLKemetRadioElement) => radio.checked) ?? radios[0];

    let index: number;

    if (typeof checkedIndex === 'number') {
      index = checkedIndex + shift;
    } else {
      index = shift;
    }

    if (arrowKeys.includes(event.key)) {
      if (index < 0) {
        index = radios.length - 1;
      }

      if (index > radios.length - 1) {
        index = 0;
      }

      this.radios.forEach((radio) => {
        radio.checked = false;
        radio.tabIndex = -1;
      });

      const radio = this.radios[index];
      if (radio) {
        radio.focus();
        radio.checked = true;
        radio.tabIndex = 0;
      }
    }
  }

  handleSlotChange() {
    const radios = Array.from(this.radios);
    const checkedRadio = radios.find((radio: HTMLKemetRadioElement) => radio.checked) as HTMLKemetRadioElement;

    this.radios.forEach((radio: HTMLKemetRadioElement) => {
      radio.tabIndex = -1;
      radio.input.tabIndex = -1;
    });

    if (checkedRadio) {
      checkedRadio.tabIndex = 0;
    }
  }

  makeMessage() {
    if (this.appearance === 'error' || this.appearance === 'warning') {
      return html`<span part="message">${this.message}</span>`;
    }

    return null;
  }

  checkValidity() {
    if (this.required) {
      return !!this.value;
    }

    return true;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kemet-radios': KemetRadios
  }
}
