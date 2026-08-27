import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import type { TypeRoundedSizes, TypeAppearance } from '../../utilities/constants';
import { emitEvent } from '../../utilities/events';
import styles from './styles.css?inline';

export enum EnumVariants {
  Standard = 'standard',
  Text = 'text',
  Outlined = 'outlined',
  Plain = 'plain',
  Edge = 'edge',
}

export enum EnumTargets {
  Blank = '_blank',
  Self = '_self',
  Parent = '_parent',
  Top = '_top'
}

export enum EnumTypes {
  Button = 'button',
  Submit = 'submit',
  Reset = 'reset'
}

export enum EnumSizes {
  XSmall = 'xs',
  Small = 'sm',
  Medium = 'md',
  Large = 'lg',
  XLarge = 'xl'
}

/**
 * @since 1.0.0
 * @status stable
 *
 * @tagname kemet-button
 * @summary A versatile button that can be used either to submit a form, trigger an action, or link to content.
 *
 * @prop {string} href - The url a button should link too
 * @prop {boolean} outlined - Outline style for a button
 * @prop {boolean} disabled - Determines whether not a button is disabled
 * @prop {TypeVariants} variant - Controls the type of button.
 * @prop {TypeTargets} target - The target attribute for a link
 * @prop {TypeTypes} type - The type attribute for a button
 * @prop {TypeRoundedSizes} rounded - The border radius of the button
 * @prop {EnumSizes} size - The size of the button
 * @prop {boolean} loading - Determines if the button is in a loading state
 * @prop {EnumAppearance} appearance - The appearance of the button's color
 * @prop {'light' | 'dark'} polarity - Determines if the component has a dark or light background
 * @prop {string} dom - The status of dom initalization.
 *
 * @slot left - Allows you to place an icon to the left of the button text.
 * @slot right - Allows you to place an icon to the right of the button text.
 *
 * @csspart button - The button or anchor element.
 *
 * @cssproperty --kemet-button-hover-brightness - The brightness of the hover state.
 * @cssproperty --kemet-button-active-brightness - The brightness of the active state.
 * @cssproperty --kemet-button-circle-size - The diameter of a circle button.
 * @cssproperty --kemet-button-transition-speed - The transition speed of the hover effect.
 * @cssproperty --kemet-button-gap - The gap between the button and icons.
 * @cssproperty --kemet-button-border-width - The width of the outline border.
 * @cssproperty --kemet-button-border-style - The style of the outline border.
 *
 * @fires kemet-button-mounted - Fired when the button is mounted to the DOM
 * @detail {HTMLElement} element - The button element
 */

@customElement('kemet-button')
export default class KemetButton extends LitElement {
  static styles = [unsafeCSS(styles)];

  @property({ type: String })
  href!: string;

  @property({ type: Boolean, reflect: true })
  disabled: boolean = false;

  @property({ reflect: true })
  variant: EnumVariants = EnumVariants.Standard;

  @property()
  target: EnumTargets = EnumTargets.Self;

  @property()
  type: EnumTypes = EnumTypes.Button;

  @property({ type: Boolean, reflect: true, attribute: 'icon-left' })
  iconLeft: boolean = false;

  @property({ type: Boolean, reflect: true, attribute: 'icon-right' })
  iconRight: boolean = false;

  @property({ type: Boolean, reflect: true, attribute: 'icon-button' })
  iconButton: boolean = false;

  @property({ type: String, reflect: true })
  rounded!: TypeRoundedSizes;

  @property({ type: Boolean, reflect: true })
  loading: boolean = false;

  @property({ type: String, reflect: true })
  appearance!: TypeAppearance;

  @property({ type: String, reflect: true })
  size!: EnumSizes;

  @property({ type: String, reflect: true })
  polarity?: 'light' | 'dark';

  @property({ type: String, reflect: true })
  dom: string = 'initializing';


  @query('button')
  internalButton!: HTMLButtonElement;

  firstUpdated() {
    emitEvent(this, 'kemet-button-mounted', {
      bubbles: true,
      composed: true,
      detail: {
        element: this,
      },
    });
    this.dom = 'mounted';
  }

  render() {
    if (this.href && !this.disabled) {
      return html`
        <a
          href=${this.href}
          target=${this.target}
          class="button"
          part="button"
          @click=${(event: PointerEvent) => this.handleClick(event)}
        >
          <slot name="left" @slotchange=${this.handleLeftChange}></slot>
          <slot name="icon-button" @slotchange=${this.handleIconButtonChange}></slot>
          ${this.loading ? html`<slot name="loader"></slot>` : ''}
          <span class="text"><slot></slot></span>
          <slot name="right" @slotchange=${this.handleRightChange}></slot>
        </a>
      `;
    }

    return html`
      <button
        class="button"
        part="button"
        type=${this.type}
        ?disabled=${this.disabled}
        aria-disabled=${this.disabled ? 'true' : 'false'}
        aria-label=${this.loading ? 'Loading' : ''}
        @click=${(event: PointerEvent) => this.handleClick(event)}
      >
        <slot name="left" @slotchange=${this.handleLeftChange}></slot>
        <slot name="icon-button" @slotchange=${this.handleIconButtonChange}></slot>
        ${this.loading ? html`<slot name="loader"></slot>` : ''}
        <span class="text"><slot></slot></span>
        <slot name="right" @slotchange=${this.handleRightChange}></slot>
      </button>
    `;
  }

  private handleLeftChange() {
    const left = this.querySelector('[slot="left"]');
    if (left) this.iconLeft = true;
  }

  private handleRightChange() {
    const right = this.querySelector('[slot="right"]');
    if (right) this.iconRight = true;
  }

  private handleIconButtonChange() {
    const iconButton = this.querySelector('[slot="icon-button"]');
    if (iconButton) this.iconButton = true;
  }

  private makeLightDOMButton() {
    const button = document.createElement('button');

    for (const attribute of this.attributes) {
      button.setAttribute(attribute.name, attribute.value);
    }

    button.type = this.type;
    button.style.position = 'absolute !important';
    button.style.width = '0 !important';
    button.style.height = '0 !important';
    button.style.clipPath = 'inset(50%) !important';
    button.style.overflow = 'hidden !important';
    button.style.whiteSpace = 'nowrap !important';
    button.value = '';

    return button;
  }

  private handleClick(event: PointerEvent) {
    if (this.disabled || this.loading) {
      event?.preventDefault();
      return;
    }

    const form = this.closest('form');

    if (!form || (this.type !== EnumTypes.Submit && this.type !== EnumTypes.Reset)) {
      return;
    }

    const lightDOMButton = this.makeLightDOMButton();

    form.appendChild(lightDOMButton);
    lightDOMButton.click();
    lightDOMButton.remove();
  }


  /**
   * Triggers a click event on the button element.
   * @method click
   * @public
   * @returns {void}
   */
  click() {
    if (!this.internalButton) {
      return;
    }
    this.internalButton.click();
  }

  /**
   * Triggers a blur on the button element.
   * @method blur
   * @public
   * @returns {void}
   */
  blur() {
    if (!this.internalButton) {
      return;
    }
    this.internalButton.blur();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kemet-button': KemetButton
  }
}
