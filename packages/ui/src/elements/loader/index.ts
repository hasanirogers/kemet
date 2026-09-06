import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './styles.css.ts';
import { emitEvent } from '../../utilities/events';

export enum EnumVariants {
  NO_BORDER = 'no-border',
  BORDER_TOP = 'border-top',
  DOUBLE_BORDER = 'double-border',
  DOUBLE_SPINNERS = 'double-spinners',
  THREE_DOTS = 'three-dots',
  FULL_CIRCLE = 'full-circle',
  SPINNER = 'spinner',
  MESH = 'mesh',
}

/**
 * @since 5.0.0
 * @status stable
 *
 * @tagname kemet-loader
 * @summary Displays animations for a loading state.
 *
 * @prop {string} variant - The style of loader to display
 * @prop {number} size - How large to make the loader.
 *
 * @csspart loader - The main loader container
 *
 * @cssproperty --kemet-loader-color - The color of the loader.
 * @cssproperty --kemet-loader-thickness - The thickness of the loader.
 * @cssproperty --kemet-loader-dot-size - The size of the dots in the loader.
 * @cssproperty --kemet-loader-size - The size of the loader.
 *
 * @fires kemet-loader-mounted - Fired when the loader is mounted to the DOM
 * @detail {HTMLElement} element - The loader element
 */
@customElement('kemet-loader')
export class KemetLoader extends LitElement {
  static styles = [styles];

  @property({ type: String, reflect: true })
  variant: EnumVariants = EnumVariants.NO_BORDER;

  @property({ type: Number })
  size: number = 48;

  firstUpdated() {
    emitEvent(this, 'kemet-loader-mounted', {
      bubbles: true,
      composed: true,
      detail: {
        element: this,
      },
    });
  }

  render() {
    if (
      this.variant === EnumVariants.THREE_DOTS ||
      this.variant === EnumVariants.FULL_CIRCLE ||
      this.variant === EnumVariants.MESH
    ) {
      this.style.setProperty('--kemet-loader-dot-size', `${this.size}px`);
      return html`
        <div part="loader">
          ${this.makeLoader()}
        </div>
      `;
    }

    if (this.variant === EnumVariants.SPINNER) {
      this.style.setProperty('--kemet-loader-size', `${this.size}px`);
      return html`
        <div part="loader">
          ${this.makeLoader()}
        </div>
      `;
    }

    return html`
      <div style="width: ${this.size}px; height: ${this.size}px;" part="loader">
        ${this.makeLoader()}
      </div>
    `;
  }

  makeLoader() {
    switch (this.variant) {
      case EnumVariants.NO_BORDER:
        return html`
          <div class="nb-spinner"></div>
        `;
      case EnumVariants.BORDER_TOP:
        return html`
          <div class="bt-spinner"></div>
        `;
      case EnumVariants.DOUBLE_BORDER:
        return html`
          <div class="db-spinner"></div>
        `;
      case EnumVariants.DOUBLE_SPINNERS:
        return html`
          <div class="dbl-spinner" style="width: ${this.size}px; height: ${this.size}px;"></div>
          <div class="dbl-spinner dbl-spinner--2" style="width: ${this.size}px; height: ${this.size}px;"></div>
        `;
      case EnumVariants.THREE_DOTS:
        return html`
          <div class="dot-loader"></div>
          <div class="dot-loader dot-loader--2"></div>
          <div class="dot-loader dot-loader--3"></div>
        `;
      case EnumVariants.FULL_CIRCLE:
        return html`
          <div class="circle-loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        `;
      case EnumVariants.SPINNER:
        return html`
          <div class="ml-loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        `;
      case EnumVariants.MESH:
        return html`
          <div class="mesh-loader">
            <div class="set-one">
              <div class="circle"></div>
              <div class="circle"></div>
            </div>
            <div class="set-two">
              <div class="circle"></div>
              <div class="circle"></div>
            </div>
          </div>
        `;
    }
  }
}
