import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EnumRoundedSizes, EnumAppearances } from '../../utilities/constants';
import { emitEvent } from '../../utilities/events';
import styles from './styles.css.ts';


/**
 * @since 1.0.0
 * @status stable
 *
 * @tagname kemet-badge
 * @summary Badges display the status of information.
 *
 * @prop {TypeStatus} status - The status of the badge
 * @prop {number} circlePadding - Padding on the badge as a circle
 * @prop {TypeRoundedSizes} rounded - Rounds the corners on the badge
 * @prop {boolean} outlined - Outlines the badge
 * @prop {EnumAppearance} appearance - The appearance of the badge's color
 * @prop {'light' | 'dark'} polarity - Determines if the component has a dark or light background
 * @prop {string} dom - The status of dom initalization.
 *
 * @fires kemet-badge-mounted - Fires when the badge is mounted
 * @detail {HTMLElement} element - The badge element
 *
 * @cssproperty --kemet-badge-padding - The padding of the badge.
 * @cssproperty --kemet-badge-border-width - The border width of the badge.
 * @cssproperty --kemet-badge-border-style - The border style of the badge.
 *
 */

@customElement('kemet-badge')
export default class KemetBadge extends LitElement {
  static styles = [styles];

  @property({ reflect: true })
  appearance!: EnumAppearances;

  @property({ type: Number, attribute: 'circle-padding' })
  circlePadding: number = 0;

  @property({ type: String, reflect: true })
  rounded!: EnumRoundedSizes;

  @property({ type: Boolean, reflect: true })
  outlined: boolean = false;

  @property({ type: String, reflect: true })
  polarity?: 'light' | 'dark';

  @property({ type: String, reflect: true })
  dom: string = 'initializing';

  @state()
  iconLeft: boolean = false;

  @state()
  iconRight: boolean = false;

  firstUpdated() {
    emitEvent(this, 'kemet-badge-mounted', {
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
      <slot name="left" @slotchange=${() => this.handleLeftChange()}></slot>
      ${this.iconLeft ? html`&nbsp;` : ''}
      <slot @slotchange=${() => this.handleSlotChange()}></slot>
      ${this.iconRight ? html`&nbsp;` : ''}
      <slot name="right" @slotchange=${() => this.handleRightChange()}></slot>
    `;
  }

  handleSlotChange() {
    if (this.rounded === EnumRoundedSizes.Circle) {
      this.style.height = `${this.offsetWidth + this.circlePadding}px`;
      this.style.width = `${this.offsetWidth + this.circlePadding}px`;
    }
  }

  handleLeftChange() {
    const left = this.querySelector('[slot="left"]');
    if (left) this.iconLeft = true;
  }

  handleRightChange() {
    const right = this.querySelector('[slot="right"]');
    if (right) this.iconRight = true;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kemet-badge': KemetBadge
  }
}
