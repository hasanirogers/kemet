import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { emitEvent } from '../../utilities/events';
import { EnumRoundedSizes } from '../../utilities/constants';
import styles from './styles.css?inline';

export enum EnumElevation {
  Level1 = 'level1',
  Level2 = 'level2',
  Level3 = 'level3',
  Level4 = 'level4',
  Level5 = 'level5',
  Level6 = 'level6',
  Inner = 'inner',
}

/**
 * @since 1.4.0
 * @status stable
 *
 * @tagname kemet-card
 * @summary A highly configurable panel design to display media and information.
 *
 * @prop {boolean} center - Centers the elements in the card.
 * @prop {boolean} filled - Fills the card with a background color.
 * @prop {boolean} borderless - Removes the border from the card.
 * @prop {EnumElevation} elevation - The elevation level of the card.
 * @prop {'light' | 'dark'} polarity - Determines if the component has a dark or light background
 * @prop {string} dom - The status of dom initalization.
 *
 * @slot default - The contents of the alert.
 * @slot header - The card's header.
 * @slot media - A slot for images, videos, or embeds.
 * @slot caption - Text for the media slot.
 * @slot footer - The card's footer.
 *
 *
 * @csspart media - The media area of the card.
 * @csspart body - The main contents of the card.
 *
 * @cssproperty --kemet-card-padding - The space around elements.
 * @cssproperty --kemet-card-border-color - The color of the borders.
 * @cssproperty --kemet-card-color - The color of the text. Default:
 * @cssproperty --kemet-card-max-width - The max width of the card.
 * @cssproperty --kemet-card-border - The border around the card.
 * @cssproperty --kemet-card-body-padding - The body spacing.
 * @cssproperty --kemet-card-header-padding - The header spacing.
 * @cssproperty --kemet-card-header-border-bottom - The header border.
 * @cssproperty --kemet-card-caption-color - The caption text color.
 * @cssproperty --kemet-card-caption-padding - The caption spacing.
 * @cssproperty --kemet-card-caption-background-color - The caption background color.
 * @cssproperty --kemet-card-footer-padding - The footer spacing.
 * @cssproperty --kemet-card-footer-border-top - The footer border.
 * @cssproperty --kemet-card-filled-color - The filled background color.
 *
 * @fires kemet-card-mounted - Fired when the card is mounted to the DOM
 * @detail {HTMLElement} element - The card element
 */

@customElement('kemet-card')
export default class KemetCard extends LitElement {
  static styles = [unsafeCSS(styles)];

  @property({ type: Boolean, reflect: true })
  center: boolean = false;

  @property({ type: String, reflect: true })
  rounded!: EnumRoundedSizes;

  @property({ type: Boolean, reflect: true })
  filled: boolean = false;

  @property({ type: Boolean, reflect: true })
  borderless: boolean = false;

  @property({ type: String, reflect: true })
  elevation!: string;

  @property({ type: String, reflect: true })
  polarity: 'light' | 'dark' = 'light';

  @property({ type: String, reflect: true })
  dom: string = 'initializing';

  firstUpdated() {
    emitEvent(this, 'kemet-card-mounted', {
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
      <slot name="header"></slot>
      <div class="media" part="media">
        <slot name="media"></slot>
        <slot name="caption"></slot>
      </div>
      <div class="body" part="body">
        <slot></slot>
      </div>
      </div>
      <slot name="footer"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kemet-card': KemetCard
  }
}
