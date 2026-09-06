import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { emitEvent } from '../../utilities/events';

/**
 * @since 1.0.0
 * @status stable
 *
 * @tagname kemet-dialog-close
 * @summary A close button for a dialog.
 *
 * @prop {'light' | 'dark'} polarity - Determines if the component has a dark or light background
 * @prop {string} dom - The status of dom initalization.
 *
 * @event kemet-dialog-close-pressed - Fires when the close button is pressed
 *
 * @fires kemet-dialog-close-mounted - Fired when the dialog close button is mounted to the DOM
 * @detail {HTMLElement} element - The dialog close button element
 *
 */

@customElement('kemet-dialog-close')
export default class DialogClose extends LitElement {
  static styles = [
    css`
      :host {
        color: inherit;
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        border-radius: var(--kemet-border-radius-circle);
        cursor: pointer;
      }
    `,
  ];

  @property({ type: String, reflect: true })
  polarity?: 'light' | 'dark';

  @property({ type: String, reflect: true })
  dom: string = 'initializing';

  firstUpdated() {
    emitEvent(this, 'kemet-dialog-close-mounted', {
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
      <slot @keyup=${() => this.close()} @click=${() => this.close()}></slot>
    `;
  }

  close() {
    emitEvent(this, 'kemet-dialog-close-pressed', { element: this });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kemet-dialog-close': DialogClose
  }
}
