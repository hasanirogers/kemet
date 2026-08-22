import { html, css, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { emitEvent } from '../../utilities/events';
import HTMLKemetFieldElement from '../field';
import HTMLKemetInputElement from '../input';
import HTMLKemetTextareaElement from '../textarea';
import { EnumAppearances } from '../../utilities/constants';

export interface InterfaceAppearanceChangeEvent {
  appearance: EnumAppearances;
  validity: ValidityState;
  element: HTMLKemetFieldElement;
}

/**
 * @since 1.0.0
 * @status stable
 *
 * @tagname kemet-count
 * @summary Maintains a character count for an input field. Is to be used only in the component slot of a Field component.
 *
 * @prop {string} message - The text label shown to users
 * @prop {number} remaining - The number of characters remaining
 * @prop {number} limit - The maximum number of characters allowed
 * @prop {boolean} validateImmediately - Set to true if the field should validate as soon as the character limit is reached
 *
 * @cssproperty --kemet-count-font-size - The font size. Default: 90%.
 *
 * @fires kemet-count-appearance-change - Fires when there's a change in status.
 *
 */

@customElement('kemet-count')
export default class KemetCount extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        font-size: var(--kemet-count-font-size, 90%);
        margin-top: 0.8rem;
      }
    `,
  ];

  @property({ type: String })
  message!: string;

  @property({ type: Number })
  limit!: number;

  @property({ type: Boolean, attribute: 'validate-immediately' })
  validateImmediately!: boolean;

  @state()
  remaining!: number;

  @state()
  field!: HTMLKemetFieldElement;

  @state()
  inputSlot!: HTMLKemetInputElement | HTMLKemetTextareaElement;

  @state()
  input!: HTMLInputElement | null;

  @state()
  textarea!: HTMLTextAreaElement | null;

  firstUpdated() {
    this.field = this.closest('kemet-field') as HTMLKemetFieldElement;
    this.inputSlot = this.field.querySelector('[slot="input"]') as HTMLKemetInputElement | HTMLKemetTextareaElement;
    this.remaining = this.limit - this.field.length;

    this.field.addEventListener('kemet-input-input', (event: Event) => this.handleInput(event));
    this.field.addEventListener('kemet-textarea-input', (event: Event) => this.handleInput(event));

    this.input = this.inputSlot?.shadowRoot?.querySelector('input') || null;
    this.textarea = this.inputSlot?.shadowRoot?.querySelector('textarea') || null;
  }

  render() {
    return html`${this.remaining} ${this.message}`;
  }

  handleInput(event: Event) {
    this.remaining = this.limit - (event as CustomEvent).detail.value.length;

    const nativeElement = this.input || this.textarea;

    if (nativeElement) {
      if (this.remaining < 0) {
        if (this.validateImmediately) {
          this.inputSlot.appearance = EnumAppearances.Error;
          this.inputSlot.invalid = true;

          emitEvent(this, 'kemet-count-appearance-change', {
            status: EnumAppearances.Error,
            validity: nativeElement.validity,
            element: this.inputSlot,
          });
        }
      } else {
        this.inputSlot.appearance = EnumAppearances.Neutral;
        nativeElement.checkValidity();

        emitEvent(this, 'kemet-count-appearance-change', {
          appearance: EnumAppearances.Neutral,
          validity: nativeElement.validity,
          element: this.inputSlot,
        });
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kemet-count': KemetCount
  }
}
