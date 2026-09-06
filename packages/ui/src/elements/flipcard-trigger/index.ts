import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { emitEvent } from '../../utilities/events';

/**
 * @since 1.0.0
 * @status stable
 *
 * @tagname kemet-flipcard-trigger
 * @summary Triggers a flipcard component to flip.
 *
 * @event kemet-flipcard-trigger-flipped - Fires when a flipcard is flipped
 *
 * @prop {'light' | 'dark'} polarity - Determines if the component has a dark or light background
 * @prop {string} dom - The status of dom initalization.
 */

@customElement('kemet-flipcard-trigger')
export default class KemetFlipcardTrigger extends LitElement {
  static styles = [
    css`
      :host {
        cursor: pointer;
      }
    `,
  ];

  @property({ type: String, reflect: true })
  polarity?: 'light' | 'dark';

  @property({ type: String, reflect: true })
  dom: string = 'initializing';

  firstUpdated() {
    emitEvent(this, 'kemet-flipcard-trigger-mounted', {
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
      <slot tabindex="0" @click=${() => this.trigger()} @keypress=${(event: KeyboardEvent) => this.handleKeyup(event)}></slot>
    `;
  }

  trigger() {
    emitEvent(this, 'kemet-flipcard-trigger-flipped', {
      bubbles: true,
      composed: true,
      detail: { element: this }
    });
  }

  handleKeyup(event: KeyboardEvent) {
    event.preventDefault();

    if (event.key === 'Enter') {
      this.trigger();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kemet-flipcard-trigger': KemetFlipcardTrigger
  }
}
