import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './styles.css?inline';
import { emitEvent } from '../../utilities/events';

/**
 * @since 1.4.0
 * @status stable
 *
 * @tagname kemet-avatars
 * @summary Groups multiple avatar elements.
 *
 * @cssproperty --kemet-avatars-squeeze - The space between avatars. Default: -1.5rem.
 *
 * @fires kemet-avatars-mounted - Fires when the avatars are mounted.
 * @detail {element: HTMLElement} - The avatars element.
 */

@customElement('kemet-avatars')
export default class KemetAvatars extends LitElement {
  static styles = [unsafeCSS(styles)];

  @property({ type: String, reflect: true })
  polarity: 'light' | 'dark' = 'light';

  @property({ type: String, reflect: true })
  dom: string = 'initializing';

  firstUpdated() {
    emitEvent(this, 'kemet-avatars-mounted', {
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
    'kemet-avatars': KemetAvatars
  }
}
