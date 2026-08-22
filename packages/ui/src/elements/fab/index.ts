import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './styles.css?inline';
import { EnumAppearances, EnumRoundedSizes } from '../../utilities/constants';
import { emitEvent } from '../../utilities/events';

/**
 * @since 1.2.0
 * @status stable
 *
 * @tagname kemet-fab
 * @summary The FAB, or Floating Action Button, performs a primary action on a page.
 *
 * @prop {boolean} expanded - The expanded state of the button.
 * @prop {boolean} outlined - Outline style for a button.
 * @prop {boolean} disabled - Determines whether not a button is disabled.
 * @prop {EnumRoundedSizes} rounded - Displays the fab with rounded corners.
 * @prop {EnumAppearances} appearance - The appearance of the fab.
 * @prop {number} expandPoint - The distance, in pixels, where the fab should automatically expand.
 * @prop {number} collapsePoint - The distance, in pixels, where the fab should automatically collapse.
 * @prop {'light' | 'dark'} polarity - Determines if the component has a dark or light background.
 * @prop {string} dom - The status of dom initalization.
 *
 * @slot Icon - A slot for an icon to display.
 * @slot default - The text for the FAB.
 * *
 * @cssproperty --kemet-fab-size - The width and height of the fab.
 * @cssproperty --kemet-fab-color - The text color of the fab.
 * @cssproperty --kemet-fab-icon-color - The color of the fab icon.
 * @cssproperty --kemet-fab-label-color - The color of the fab label.
 * @cssproperty --kemet-fab-padding - The padding of the fab.
 * @cssproperty --kemet-fab-border - The border of the fab.
 *
 * @csspart button - The button's container.
 * @csspart icon -  The FAB icon.
 * @csspart label - The text in the FAB.
 *
 */

@customElement('kemet-fab')
export default class KemetFAB extends LitElement {
  static styles = [unsafeCSS(styles)];

  @property({ type: Boolean, reflect: true })
  expanded: boolean = false;

  @property({ type: Boolean, reflect: true })
  outlined: boolean = false;

  @property({ type: Boolean, reflect: true })
  disabled: boolean = false;

  @property({ type: String, reflect: true })
  rounded?: EnumRoundedSizes;

  @property({ type: String, reflect: true })
  appearance?: EnumAppearances;

  @property({ type: Number, attribute: 'expand-point' })
  expandPoint: number = 0;

  @property({ type: Number, attribute: 'collapse-point' })
  collapsePoint: number = 0;

  @property({ type: String, reflect: true })
  polarity: 'light' | 'dark' = 'light';

  @property({ type: String, reflect: true })
  dom: string = 'initializing';


  firstUpdated() {
    // events
    window.addEventListener('scroll', this.handleScroll.bind(this));
    this.addEventListener('mouseover', this.handleMouseOver.bind(this));
    this.addEventListener('mouseout', this.handleMouseOut.bind(this));

    emitEvent(this, 'kemet-fab-mounted', {
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
      <button class="button" part="button" ?disabled=${this.disabled}>
        <span part="icon">
          <slot name="icon"></slot>
        </span>
        <span part="label">
          <slot></slot>
        </span>
      </button>
    `;
  }

  handleMouseOver() {
    if (!this.disabled) {
      this.expanded = true;
    }
  }

  handleMouseOut() {
    if (!this.disabled) {
      this.expanded = false;
    }
  }

  handleScroll() {
    if (window.scrollY > this.expandPoint && window.scrollY < this.collapsePoint) {
      this.expanded = true;
    } else {
      this.expanded = false;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kemet-fab': KemetFAB
  }
}
