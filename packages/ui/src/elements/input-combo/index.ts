import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { emitEvent } from '../../utilities/events';
import { EnumKeyCodes, EnumAppearances, TypeRoundedSizes, TypeAppearance, EnumRoundedSizes } from '../../utilities/constants';
import HTMLKemetFieldElement from '../field';
import HTMLKemetComboElement from '../combo';
import styles from './styles.css?inline';

export interface InterfaceSelections {
  element: HTMLUListElement;
  text: string;
  id: string;
}

/**
 * @since 3.1.0
 * @status stable
 *
 * @tagname kemet-multi-input
 * @summary An input element that accepts multiple items from a combo.
 *
 * @prop {string} slug - Used for the id of the input. Should match the slug used in a control if applicable.
 * @prop {string} name - The name of the input
 * @prop {string} placeholder - The placeholder attribute
 * @prop {boolean} disabled - The disable attribute
 * @prop {boolean} required - The required attribute
 * @prop {string} value - The input's value
 * @prop {boolean} invalid - States whether the input is invalid
 * @prop {string} status - The status of the input
 * @prop {boolean} validateOnBlur - Activates validation on blur
 * @prop {EnumRoundedSizes} rounded - Displays rounded corners
 * @prop {boolean} filled - Displays a filled input box
 * @prop {ValidityState} validity - The HTML5 validity object.

 *
 * @csspart input
 *
 * @cssproperty --kemet-input-combo-height - The height of the input.
 * @cssproperty --kemet-input-combo-color - The color of the input.
 * @cssproperty --kemet-input-combo-border - The border of the input.
 * @cssproperty --kemet-input-combo-padding-y - The padding on the input.
 * @cssproperty --kemet-input-combo-padding-x - The padding on the input.
 * @cssproperty --kemet-input-combo-icon-gap - The icon gap of the input.
 * @cssproperty --kemet-input-combo-font-color - The font color of the input.
 * @cssproperty --kemet-input-combo-chip-font-color - The font color of the chip.
 * @cssproperty --kemet-input-combo-chip-background-color - The background color of the chip.
 *
 * @event kemet-input-combo-focus - Fires when the input receives focus
 * @event kemet-input-combo-blur - Fires when the input loses focus
 * @event kemet-input-combo-input - Fires when the input receives input
 * @event kemet-input-combo-change - Fires when the input changes
 * @event kemet-input-combo-invalid - Fires when the input is invalid
 *
 */

@customElement('kemet-input-combo')
export default class InputCombo extends LitElement {
  static styles = [unsafeCSS(styles)];

  @property({ type: String })
  slug: string = 'input';

  @property({ type: String })
  placeholder: string = '';

  @property({ type: Boolean })
  disabled: boolean = false;

  @property({ type: Boolean })
  filled: boolean = false;

  @property({ type: String,reflect: true })
  rounded?: EnumRoundedSizes;

  @property({ type: String })
  name: string = 'input';

  @property({ reflect: true })
  appearance?: EnumAppearances;

  @property({ type: Boolean })
  required: boolean = false;

  @property({ type: Boolean })
  invalid!: boolean;

  @property({ type: Boolean, attribute: 'validate-on-blur' })
  validateOnBlur: boolean = false;

  @state()
  value: string = '';

  @state()
  selections: InterfaceSelections[] = [];

  @state()
  paddingLeft!: number;

  @state()
  field!: HTMLKemetFieldElement;

  @state()
  combo!: HTMLKemetComboElement;

  @query('[part=chips]')
  chips!: { offsetWidth: number; };

  @query('input')
  input!: HTMLInputElement;

  firstUpdated() {
    // elements
    this.field = this.closest('kemet-field') as HTMLKemetFieldElement;
    this.combo = this.field.querySelector('kemet-combo') as HTMLKemetComboElement;

    document.addEventListener('click', this.handleComboClose.bind(this));

    if (this.combo) {
      this.combo.addEventListener('kemet-combo-selection', (event: Event) => this.addComboItem(event));
    }
  }

  updated() {
    if (this.chips) this.calculatePadding();
  }

  render() {
    return html`
      <div>
        <input
          part="input"
          id=${this.slug}
          name=${this.name}
          placeholder=${this.placeholder}
          ?required=${this.required}
          ?disabled=${this.disabled}
          @input=${this.handleInput}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
          @change=${this.handleChange}
          @invalid=${this.handleInvalid}
          @keydown=${this.handleKeydown}
          .value=${live(this.value)}
        />
         ${this.makeSelections()}
      </div>
    `;
  }

  /**
   * Handles when a selection is made from a combo
   * @private
   * @param event
   */

  addComboItem(event: Event) {
    this.value = '';
    this.appearance = EnumAppearances.Neutral;
    const isPresent = this.selections.find(selection => selection.id === (event as CustomEvent).detail.id);
    if (!isPresent) this.selections = [...this.selections, (event as CustomEvent).detail];
  }

  /**
   * Handles when the input receives input
   * @private
   */
  handleInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    emitEvent(this, 'kemet-input-combo-input', {
      element: this,
      validity: this.input.validity,
      status: this.appearance,
      value: (event.target as HTMLInputElement).value
    });
  }

  /**
   * Handles when the input is focused
   */
  handleFocus() {
    emitEvent(this, 'kemet-input-combo-focus', { element: this });
  }

  handleBlur() {
    emitEvent(this, 'kemet-input-combo-blur', { element: this });
    if (this.validateOnBlur) {
      this.input.checkValidity();
    }
  }

  handleChange(event: Event) {
    emitEvent(this, 'kemet-input-combo-change', {
      element: this,
      validity: this.input.validity,
      status: this.appearance,
      value: (event.target as HTMLInputElement).value
    });
  }

  handleInvalid(event: Event) {
    this.appearance = EnumAppearances.Error;
    emitEvent(this, 'kemet-input-combo-invalid', {
      element: this,
      validity: this.input.validity,
      status: this.appearance,
      value: (event.target as HTMLInputElement).value
    });
  }

  /**
   * Renders the chips from the selections of the combo
   * @private
   */
  makeSelections() {
    const selections = this.selections.map(selection => html`
      <li part="chip">
        <span>${selection.text}</span>
        <button @click=${this.handleRemoveChip}>&times;</button>
      </li>
    `);

    if (this.selections) {
      return html`<ul part="chips">${selections}</ul>`;
    }

    return null;
  }

  /**
   * calculates padding to properly place the cursor of the input
   * @private
   */
  calculatePadding() {
    this.paddingLeft = this.chips.offsetWidth + 16;
  }

  /**
   * handle removing a chip from the selections
   * @private
   */
  handleRemoveChip(event: MouseEvent) {
    const chip = (event.target as Element).closest('[part=chip]');
    if (chip) {
      const span = chip.querySelector('span');
      if (span) {
        const text = span.innerText;
        this.selections = this.selections.filter(selection => selection.text !== text);
      }
    }
  }

  handleComboClose(event: MouseEvent) {
    if (event.target !== this && this.combo) {
      this.combo.show = false;
    }
  }

  handleKeydown(event: KeyboardEvent) {
    if (event.key === EnumKeyCodes.ESCAPE) {
      this.combo.show = false;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kemet-input-combo': InputCombo
  }
}
