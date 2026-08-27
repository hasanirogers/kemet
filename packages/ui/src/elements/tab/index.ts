import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { emitEvent } from '../../utilities/events';
import '../icon';
import styles from './styles.css?inline';

/**
 * @since 1.0.0
 * @status stable
 *
 * @tagname kemet-tab
 * @summary A tab in a set of tabs.
 *
 * @prop {boolean} selected - Is true when the tab is selected
 * @prop {string} link - Links to a panel name
 * @prop {boolean} closable - Determines if the tab can be closed
 * @prop {'light' | 'dark'} polarity - Determines if the component has a dark or light background
 * @prop {string} dom - The status of dom initalization.
 *
 * @cssproperty --kemet-tab-padding - The padding of the tab.
 *
 * @event kemet-tab-selected - Fires when a tab is selected
 * @event kemet-tab-closed - Fires when the tab should close
 *
 * @fires kemet-tab-mounted - Fired when the tab is mounted to the DOM
 * @detail {HTMLElement} element - The tab element
 *
 */

@customElement('kemet-tab')
export default class KemetTab extends LitElement {
  static styles = [unsafeCSS(styles)];

  @property({ type: Number })
  index!: number;

  @property({ type: Boolean, reflect: true })
  selected: boolean = false;

  @property({ type: String })
  link!: string;

  @property({ type: Boolean })
  closable!: boolean;

  @property({ type: String, reflect: true })
  polarity?: 'light' | 'dark';

  @property({ type: String, reflect: true })
  dom: string = 'initializing';

  firstUpdated() {
    this.addEventListener('click', this.select.bind(this));

    emitEvent(this, 'kemet-tab-mounted', {
      bubbles: true,
      composed: true,
      detail: {
        element: this,
      },
    });
    this.dom = 'mounted';
  }

  updated() {
    this.a11y();
  }

  render() {
    return html`
      <slot></slot>
      ${this.makeCloseable()}
    `;
  }

  select() {
    emitEvent(this, 'kemet-tab-selected', { element: this });
  }

  a11y() {
    this.setAttribute('role', 'tab');

    if (this.selected) {
      this.setAttribute('aria-selected', 'true');
      this.setAttribute('tabindex', '0');
    } else {
      this.setAttribute('aria-selected', 'false');
      this.setAttribute('tabindex', '-1');
    }
  }

  makeCloseable() {
    if (this.closable) {
      return html`&nbsp;<kemet-icon name="x-lg" size="16" @click=${() => this.handleClosable()}></kemet-icon>`;
    }

    return null;
  }

  handleClosable() {
    emitEvent(this, 'kemet-tab-closed', { element: this });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kemet-tab': KemetTab
  }
}
