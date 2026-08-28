import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './styles.css.ts';
import { emitEvent } from '../../utilities/events';

/**
 * @since 1.0.0
 * @status stable
 *
 * @tagname kemet-tab-panel
 * @summary A panel in a set of tabs.
 *
 * @prop {boolean} selected - Is true when a panel is selected
 * @prop {string} panel - Identifies the panel to be linked by a tab
 * @prop {'light' | 'dark'} polarity - Determines if the component has a dark or light background
 * @prop {string} dom - The status of dom initalization.
 *
 * @cssproperty --kemet-tab-panel-fade-speed - The fade speed.
 *
 * @fires kemet-tab-panel-mounted - Fired when the tab panel is mounted to the DOM
 * @detail {HTMLElement} element - The tab panel element
 *
 */

@customElement('kemet-tab-panel')
export default class KemetTabPanel extends LitElement {
  static styles = [styles];

  @property({ type: Boolean, reflect: true })
  selected: boolean = false;

  @property({ type: String })
  panel!: string;

  @property({ type: Number })
  index!: number;

  @property({ type: String, reflect: true })
  polarity?: 'light' | 'dark';

  @property({ type: String, reflect: true })
  dom: string = 'initializing';

  firstUpdated() {
    emitEvent(this, 'kemet-tab-panel-mounted', {
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
    `;
  }

  a11y() {
    this.setAttribute('role', 'tabpanel');

    if (this.selected) {
      this.setAttribute('tabindex', '0');
    } else {
      this.setAttribute('tabindex', '-1');
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kemet-tab-panel': KemetTabPanel
  }
}
