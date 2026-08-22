import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { emitEvent } from '../../utilities/events';
import { EnumDirections, TypeDirection } from '../../utilities/constants';
import { stylesEffects } from './styles';
import styles from './styles.css?inline';

export enum EnumEffects {
  Slide = 'slide',
  Reveal = 'reveal',
  Push = 'push',
  Scale = 'scale'
}

/**
 * @since 1.0.0
 * @status stable
 *
 * @tagname kemet-drawer
 * @summary A component that adds an off-canvas menu with different effects.
 *
 * @prop {boolean} opened - Determines if the drawer is opened or not.
 * @prop {string} effect - The animation effect for opening and closing the drawer. Values include: (slide | reveal | push | scale)
 * @prop {EnumDirection} side - Allows you to control which side the drawer opens from. Values include: (left | right | top | bottom)
 * @prop {boolean} overlay - Adds an overlay over the content section of the Drawer when opened
 * @prop {boolean} fillViewport - Makes the drawer fill the viewport height
 * @prop {'light' | 'dark'} polarity - Determines if the component has a dark or light background
 * @prop {string} dom - The status of dom initalization.
 *
 * @slot sidebar - The off-screen nav area of your app or site
 * @slot body - The main content area of your app or site.
 *
 * @csspart container
 * @csspart drawer
 * @csspart pusher
 * @csspart content
 * @csspart wrapper
 *
 * @cssproperty --kemet-drawer-width - The width of the drawer.
 * @cssproperty --kemet-drawer-height - The height of the drawer.
 * @cssproperty --kemet-drawer-color - The text color of the drawer.
 * @cssproperty --kemet-drawer-background-color - The background color of the drawer.
 * @cssproperty --kemet-drawer-overlay-color - The color of the overlay.
 *
 * @event kemet-drawer-opened - Fires when the drawer opens.
 * @event kemet-drawer-closed - Fires when the drawer closes.
 *
 * @fires kemet-drawer-mounted - Fired when the button is mounted to the DOM
 * @detail {HTMLElement} element - The button element
 *
 */

@customElement('kemet-drawer')
export default class KemetDrawer extends LitElement {
  static styles = [unsafeCSS(styles), stylesEffects];

  @property({ type: Boolean, reflect: true })
  opened: boolean = false;

  @property({ type: String, reflect: true })
  effect: EnumEffects = EnumEffects.Slide;

  @property({ type: String, reflect: true })
  side: EnumDirections = EnumDirections.Left;

  @property({ type: Boolean, reflect: true })
  overlay: boolean = false;

  @property({ type: Boolean, reflect: true, attribute: 'fill-viewport' })
  fillViewport: boolean = false;

  @property({ type: String, reflect: true })
  polarity: 'light' | 'dark' = 'light';

  @property({ type: String, reflect: true })
  dom: string = 'initializing';

  firstUpdated() {
    this.addEventListener('click', (event) => {
      const targetElement = event.target as HTMLElement;
      if (this.opened && targetElement.tagName.toLowerCase() === 'kemet-drawer') {
        this.opened = false;
      }
    });

    emitEvent(this, 'kemet-drawer-mounted', {
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
      emitEvent(this, 'kemet-drawer-opened', { element: this });
    }

    if (prevProps.get('opened') && this.opened === false) {
      emitEvent(this, 'kemet-drawer-closed', { element: this });
    }
  }

  render() {
    return html`
      <section part="container">
        <div part="drawer" title="Drawer">
          <slot name="sidebar"></slot>
        </div>
        <div part="pusher">
          <div part="content">
            <div part="wrapper">
              <slot name="body"></slot>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kemet-drawer': KemetDrawer
  }
}
