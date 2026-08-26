import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './styles.css?inline';
import { emitEvent } from '../../utilities/events';

/**
 * @since 1.3.0
 * @status stable
 *
 * @tagname kemet-sortable-item
 * @summary An item in a sortable list.
 *
 * @prop {boolean} ghost - Automatically set to true when an item is dragged to a new spot.
 * @prop {'light' | 'dark'} polarity - Determines if the component has a dark or light background
 * @prop {string} dom - The status of dom initalization.
 *
 * @fires kemet-sortable-item-mounted - Fired when the sortable item is mounted to the DOM
 * @detail {HTMLElement} element - The sortable item element
 */

@customElement('kemet-sortable-item')
export default class KemetSortableItem extends LitElement {
  static styles = [unsafeCSS(styles)];

  @property({ type: Boolean, reflect: true })
  ghost!: boolean;

  @property({ type: String, reflect: true })
  polarity: 'light' | 'dark' = 'light';

  @property({ type: String, reflect: true })
  dom: string = 'initializing';

  firstUpdated() {
    this.draggable = true;
    emitEvent(this, 'kemet-sortable-item-mounted', {
      bubbles: true,
      composed: true,
      detail: {
        element: this,
      },
    });
    this.dom = 'mounted';
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kemet-sortable-item': KemetSortableItem
  }
}
