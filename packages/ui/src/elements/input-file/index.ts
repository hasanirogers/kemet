import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../icon';
import styles from './styles.css?inline';
import loaderStyles from './loaders.css?inline';
import { emitEvent } from '../../utilities/events';

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
};

/**
 * @since 1.3.0
 * @status stable
 *
 * @tagname kemet-upload-file
 * @summary A file in the upload.
 *
 * @prop {string} name - The name of the file
 * @prop {number} loaded - The number of bytes loaded
 * @prop {number} size - The file size in bytes
 * @prop {string} type - The file type
 * @prop {string} status - The status of the file. Values are complete | uploading | error.
 * @prop {number} percent - Percentage of file completion that's calculated by the loaded property.
 * @prop {string} message - An error message to give to users
 * @prop {'light' | 'dark'} polarity - Determines if the component has a dark or light background
 * @prop {string} dom - The status of dom initalization.
 *
 * @cssproperty --kemet-upload-file-color - The default text color.
 * @cssproperty --kemet-upload-file-padding - The padding around the file.
 * @cssproperty --kemet-upload-file-border - The border around the file.
 *
 * @csspart percentage - Area that displays the percentage.
 * @csspart filename - Area that displays file name.
 * @csspart loaded - Area that displays how much has uploaded.
 * @csspart message - Area for the error message.
 * @csspart indicator - Area for status icon.
 *
 * @fires kemet-input-file-mounted - Fired when the input file is mounted to the DOM
 * @detail {HTMLElement} element - The input file element
 */

@customElement('kemet-input-file')
export default class KemetInputFile extends LitElement {
  static styles = [unsafeCSS(styles), unsafeCSS(loaderStyles)];

  @property({ type: String })
  name!: string;

  @property({ type: Number })
  loaded: number = 0;

  @property({ type: Number })
  size: number = 0;

  @property({ type: String })
  type!: string;

  @property({ type: String, reflect: true })
  status!: string;

  @property({ type: Number })
  percent: number = 0;

  @property({ type: String })
  message!: string;

  @property({ type: String, reflect: true })
  polarity?: 'light' | 'dark';

  @property({ type: String, reflect: true })
  dom: string = 'initializing';

  firstUpdated() {
    emitEvent(this, 'kemet-input-file-mounted', {
      bubbles: true,
      composed: true,
      detail: {
        element: this,
      },
    });
    this.dom = 'mounted';
  }

  updated() {
    this.percent = this.calculatePercent();
  }

  render() {
    return html`
      <div class="percentage" part="percentage">
        <span>${this.percent}%</span>
      </div>
      <div>
        <h3 part="filename">${this.name}</h3>
        <span part="loaded">${formatBytes(this.loaded)} / ${formatBytes(this.size)}</span>
        ${this.message ? html`<div class="message" part="message">${this.message}</div>` : null}
      </div>
      <div class="indicator" part="indicator">
        ${this.getStatusIcon()}
      </div>
    `;
  }

  calculatePercent() {
    const percent = Math.round((this.loaded * 100.0) / this.size);
    return percent > 100 ? 100 : percent;
  }

  getStatusIcon() {
    if (this.status === 'uploading') {
      return html`<div class="lds-ripple"><div></div><div></div></div>`;
    }

    if (this.status === 'complete') {
      return html`<kemet-icon name="check-circle" size="48"></kemet-icon>`;
    }

    if (this.status === 'error') {
      return html`<kemet-icon name="exclamation-circle" size="48"></kemet-icon>`;
    }

    return null;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kemet-input-file': KemetInputFile
  }
}
