import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import styles from './styles.css?inline';
import { emitEvent } from '../../utilities/events';
import { EnumRoundedSizes } from '../../utilities/constants';

/**
 * @since 1.0.0
 * @status stable
 *
 * @tagname kemet-flipcard
 * @summary A card that has a front and back side which can be flipped.
 *
 * @prop {string} axis
 * @prop {boolean} flipped
 * @prop {boolean} flipOnHover
 * @prop {string} height
 * @prop {boolean} measure
 * @prop {EnumRoundedSizes} rounded - The border radius of the card
 * @prop {'light' | 'dark'} polarity - Determines if the component has a dark or light background
 * @prop {string} dom - The status of dom initalization.
 *
 * @slot front - The front of the card.
 * @slot back - The back of the card.
 *
 * @csspart front - The front of the card.
 * @csspart back - The back of the card.
 * @csspart wrapper - A container for both front and back of the card.
 *
 * @cssproperty --kemet-flipcard-width - The width of the card.
 * @cssproperty --kemet-flipcard-height - The height of the card.
 * @cssproperty --kemet-flipcard-ratio - The aspect ratio of the card.
 * @cssproperty --kemet-flipcard-border-radius - The border radius of the card.
 * @cssproperty --kemet-flipcard-border - The border of the card.
 *
 * @fires kemet-flipcard-mounted - Fired when the flipcard is mounted to the DOM
 * @detail {HTMLElement} element - The flipcard element
 *
 */

@customElement('kemet-flipcard')
export default class KemetFlipcard extends LitElement {
  static styles = [unsafeCSS(styles)];

  @property({ type: String, reflect: true })
  axis: string = 'horizontal';

  @property({ type: Boolean, reflect: true })
  flipped: boolean = false;

  @property({ type: Boolean, attribute: 'flip-on-hover' })
  flipOnHover: boolean = false;

  @property({ type: String })
  height: string = 'auto';

  @property({ type: Boolean })
  measure: boolean = false;

  @property({ type: String, reflect: true })
  rounded?: EnumRoundedSizes;

  @property({ type: String, reflect: true })
  polarity: 'light' | 'dark' = 'light';

  @property({ type: String, reflect: true })
  dom: string = 'initializing';

  @query('[name="front"]')
  frontChildren!: HTMLSlotElement;

  @query('[name="back"]')
  backChildren!: HTMLSlotElement;

  @state()
  frontElement!: HTMLElement;

  @state()
  backElement!: HTMLElement;

  constructor() {
    super();

    this.addEventListener('kemet-flipcard-trigger-flipped', () => {
      this.flipped = !this.flipped;
    });
  }

  firstUpdated() {
    this.frontElement = this.querySelector('[slot=front]') as HTMLElement;
    this.backElement = this.querySelector('[slot=back]') as HTMLElement;
    window.addEventListener('resize', this.determineHeight.bind(this));

    emitEvent(this, 'kemet-flipcard-mounted', {
      bubbles: true,
      composed: true,
      detail: {
        element: this,
      },
    });
    this.dom = 'mounted';
  }

  updated() {
    this.determineHeight();
  }

  render() {
    return html`
      <section
        tabindex="0"
        part="wrapper"
        @blur=${() => { if (this.flipOnHover) this.flipped = false; }}
        @focus=${() => { if (this.flipOnHover) this.flipped = true; }}
        @mouseover=${() => { if (this.flipOnHover) this.flipped = true; }}
        @mouseout=${() => { if (this.flipOnHover) this.flipped = false; }}>
        <div id="front" class="front" part="front">
          <slot name="front" @slotchange="${() => this.determineHeight()}"></slot>
        </div>
        <div id="back" class="back" part="back">
          <slot name="back" @slotchange="${() => this.determineHeight()}"></slot>
        </div>
      </section>
    `;
  }

  determineHeight() {
    // setTimeout is need to simulate a DOM repaint
    // without the repaint, offsetHeight on Custom Elements = 0
    // so this is needed for 'measure' to work correctly

    setTimeout(() => {
      if (this.measure) {
        if (this.frontElement?.offsetHeight > this.backElement?.offsetHeight) {
          this.height = `${this.frontElement?.offsetHeight}px`;
        } else {
          this.height = `${this.backElement?.offsetHeight}px`;
        }

        this.style.height = this.height;
      } else {
        this.style.removeProperty('height');
      }
    }, 0);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kemet-flipcard': KemetFlipcard
  }
}
