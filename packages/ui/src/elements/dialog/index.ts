import { html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { emitEvent } from '../../utilities/events';
import { EnumRoundedSizes } from '../../utilities/constants';
import styles from './styles.css.ts';
import stylesEffects from './effects.css.ts';

export enum EnumEffects {
  FadeinScaleup = 'fadein-scaleup',
  SlideRight = 'slide-right',
  SlideBottom = 'slide-bottom',
  Newspaper = 'newspaper',
  Fall = 'fall',
  SideFall = 'side-fall',
  FlipHorizontal = 'flip-horizontal',
  FlipVertical = 'flip-vertical',
  Sign3d = 'sign-3d',
  SuperScaled = 'super-scaled',
  Slit = 'slit',
  RotateBottom = 'rotate-bottom',
  RotateLeft = 'rotate-left'
}


/**
 * @since 1.0.0
 * @status stable
 *
 * @tagname kemet-dialog
 * @summary A dialog that has many built-in effects and flexible styles.
 *
 * @prop {boolean} opened
 * @prop {string} effect
 * @prop {boolean} closeOnClick
 * @prop {string} breakpoint
 * @prop {boolean} mobile
 * @prop {EnumRoundedSizes} rounded
 * @prop {'light' | 'dark'} polarity - Determines if the component has a dark or light background
 * @prop {string} dom - The status of dom initalization.
 *
 * @csspart dialog - The main contents of the dialog.
 * @csspart overlay - The surrounding scrim of the dialog.
 *
 * @cssproperty --kemet-modal-radius - The mount of rounding for rounded corners
 * @cssproperty --kemet-modal-dialog-min-width - The minimum width of the dialog.
 * @cssproperty --kemet-modal-dialog-max-width - The maximum width of the dialog.
 * @cssproperty --kemet-modal-dialog-background-color - The background color of the dialog.
 * @cssproperty --kemet-modal-dialog-mobile-width - The width of the mobile dialog.
 * @cssproperty --kemet-modal-dialog-mobile-margin - The margins of the mobile dialog.
 * @cssproperty --kemet-modal-dialog-mobile-padding - The padding of the mobile dialog.
 * @cssproperty --kemet-modal-overlay-background-color - The color of the backdrop overlay.
 * @cssproperty --kemet-modal-radius - The mount of rounding for rounded corners
 *
 * @event kemet-dialog-opened - Fires when the dialog opens
 * @event kemet-dialog-closed - Fires when the dialog closes
 *
 */

@customElement('kemet-dialog')
export default class Dialog extends LitElement {
  static styles = [styles, stylesEffects];

  @property({ type: Boolean, reflect: true })
  opened: boolean = false;

  @property({ type: String, reflect: true })
  effect?: EnumEffects;

  @property({ type: Boolean, attribute: 'close-on-click' })
  closeOnClick: boolean = false;

  @property({ type: String })
  breakpoint: string = '600px';

  @property({ type: Boolean, reflect: true })
  mobile!: boolean;

  @property({ reflect: true })
  rounded?: EnumRoundedSizes;

  @property({ type: String, reflect: true })
  polarity?: 'light' | 'dark';

  @property({ type: String, reflect: true })
  dom: string = 'initializing';

  /** @internal */
  @query('dialog')
  dialogElement!: HTMLDialogElement;

  /** @internal */
  @state()
  focusableSelector!: string;

  /** @internal */
  @state()
  focusableElements!: NodeListOf<Element>;

  constructor() {
    super();

    // bindings
    this.addEventListener('kemet-dialog-close-pressed', () => { this.handleClose(); });
  }

  firstUpdated() {
    // standard properties
    /** @internal */
    this.focusableSelector = 'body, a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';
    this.focusableElements = this.querySelectorAll(this.focusableSelector);

    // events
    this.addEventListener('keyup', (event) => {
      if (event.key === 'Escape') {
        this.handleClose();
      }
    });

    this.addEventListener('click', (event) => {
      const targetElement = event.target as HTMLElement;
      if (this.opened && this.closeOnClick && targetElement.tagName.toLowerCase() === 'kemet-dialog') {
        this.handleClose();
      }
    });

    window.addEventListener('resize', () => {
      this.isMobile();
    });

    this.focusableElements.forEach((element) => {
      (element as HTMLElement).addEventListener('keydown', (event: KeyboardEvent) => this.handleFocusableDown(event));
    });

    emitEvent(this, 'kemet-dialog-mounted', {
      bubbles: true,
      composed: true,
      detail: {
        element: this,
      },
    });
    this.dom = 'mounted';
  }

  updated(prevProps: Map<string, never>) {
    if (!prevProps.get('opened') && this.opened === true) {
      this.handleOpen();
    }

    if (prevProps.get('opened') && this.opened === false) {
      this.handleClose();
    }

    this.isMobile();
  }

  render() {
    return html`
      <dialog part="dialog" @close=${() => this.handleClose()}>
        <slot></slot>
      </dialog>
      <div class="overlay" part="overlay"></div>
    `;
  }

  isMobile() {
    const mediaQuery = window.matchMedia(`(max-width: ${this.breakpoint})`);
    this.mobile = mediaQuery.matches;
  }

  handleOpen() {
    this.opened = true;
    if (this.dialogElement?.showModal) this.dialogElement.showModal();
    emitEvent(this, 'kemet-dialog-opened', { element: this });
  }

  handleClose() {
    this.opened = false;
    if (this.dialogElement?.close) this.dialogElement.close();
    emitEvent(this, 'kemet-dialog-closed', { element: this });
  }

  handleFocusableDown(event: KeyboardEvent) {
    const firstFocusable = this.focusableElements[0] as HTMLElement;
    const lastFocusable = this.focusableElements[this.focusableElements.length - 1] as HTMLElement;

    if (event.key === 'Tab') {
      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kemet-dialog': Dialog
  }
}
