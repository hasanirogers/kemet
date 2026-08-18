import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { emitEvent } from '../../utilities/events';
import * as constants from '../../utilities/constants';
import styles from './styles.css?inline';

export enum EnumOverlayPositions {
  FIXED = 'fixed',
  TOP_FULL = 'top-full',
  BOTTOM_FULL = 'bottom-full',
  TOP_RIGHT = 'top-right',
  TOP_LEFT = 'top-left',
  BOTTOM_RIGHT = 'bottom-right',
  BOTTOM_LEFT = 'bottom-left'
}

export enum EnumBorderAppearances {
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
  Left = 'left'
}

/**
 * @since 1.4.0
 * @status stable
 *
 * @tagname kemet-alert
 * @summary Calls out important messages and notifications.
 *
 * @prop {boolean} opened - Determines if the alert is opened or not.
 * @prop {boolean} reveal - Fades in the alert when opened.
 * @prop {boolean} closable - Adds a close button to the alert.
 * @prop {EnumBorderAppearances} borderStatus - Adds a border that indicates the status.
 * @prop {boolean} hidden - Hides the element from document flow.
 * @prop {TypeOverlayPositions} overlay - Fixes the alert over content in specified position.
 * @prop {TypeVariants} variant - The style of the alert.
 * @prop {TypeRoundedSizes} rounded - The rounded size of the alert.
 * @prop {boolean} filled - Determines if the alert uses the filled style.
 * @prop {'light' | 'dark'} polarity - Determines if the component has a dark or light background
 * @prop {string} dom - The status of dom initalization.
 *
 * @slot icon - The icon of the alert.
 * @slot default - The contents of the alert.
 *
 * @fires kemet-opened - Fires when alert is opened.
 * @detail {HTMLElement} element - The alert element
 *
 * @fires kemet-closed - Fires when alert is closed.
 * @detail {HTMLElement} element - The alert element
 *
 * @fires kemet-alert-mounted - Fired when the alert is mounted to the DOM
 * @detail {HTMLElement} element - The alert element
 *
 * @csspart close - Container for the close button.
 * @csspart message - Container for the alert message.
 *
 * @cssproperty --kemet-alert-padding - The padding on the alert.
 * @cssproperty --kemet-alert-border-thickness - The thickness of the border.
 * @cssproperty --kemet-alert-align-items - The alert's alignment.
 *
 */

@customElement('kemet-alert')
export default class KemetAlert extends LitElement {
  static styles = [unsafeCSS(styles)];

  @property({ type: Boolean, reflect: true })
  opened!: boolean;

  @property({ type: Boolean, reflect: true })
  reveal: boolean = false;

  @property({ type: Boolean, reflect: true })
  closable: boolean = false;

  @property({ type: String, reflect: true })
  appearance: constants.TypeAppearance = constants.EnumAppearances.Neutral;

  @property({ type: String, reflect: true, attribute: 'border-appearance' })
  borderAppearance!: string;

  @property({ type: Boolean, reflect: true })
  hidden!: boolean;

  @property({ type: String, reflect: true })
  overlay!: string;

  @property({ type: String, reflect: true })
  rounded!: constants.TypeRoundedSizes;

  @property({ type: Boolean, reflect: true })
  filled!: boolean;

  @property({ type: String, reflect: true })
  polarity: 'light' | 'dark' = 'light';

  @property({ type: String, reflect: true })
  dom: string = 'initializing';

  private handleTransitionEnd = () => {
    if (!this.opened) {
      this.hidden = true;
    }
  };

  private handleAnimationEnd = () => {
    this.reveal = false;
  };

  shouldUpdate(prevProps: Map<string, never>) {
    if (prevProps.has('opened') && !prevProps.get('opened')) {
      this.hidden = false;
      this.reveal = true;
    }

    return true;
  }

  firstUpdated() {
    emitEvent(this, 'kemet-alert-mounted', {
      bubbles: true,
      composed: true,
      detail: {
        element: this,
      },
    });
    this.dom = 'mounted';
    this.handleMotion();
  }

  updated(prevProps: Map<string, never>) {
    if (!prevProps.get('opened') && this.opened === true) {
      emitEvent(this, 'kemet-opened', this);
    } else {
      emitEvent(this, 'kemet-closed', this);
    }
  }

  render() {
    return html`
      <slot name="icon"></slot>
      <div part="message">
        <slot></slot>
      </div>
      <div class="close" part="close">
        ${this.makeCloseBtn()}
      </div>
    `;
  }

  private makeCloseBtn() {
    if (this.closable) {
      return html`<kemet-icon-bootstrap icon="x-lg" @click=${() => { this.opened = false; }}></kemet-icon-bootstrap>`;
    }

    return null;
  }

  private handleMotion() {
    this.addEventListener('transitionend', this.handleTransitionEnd);
    this.addEventListener('animationend', this.handleAnimationEnd);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('transitionend', this.handleTransitionEnd);
    this.removeEventListener('animationend', this.handleAnimationEnd);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kemet-alert': KemetAlert
  }
}
