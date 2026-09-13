import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './styles.css?inline';

@customElement('web-element-card')
export class WebElementCard extends LitElement {
  static styles = [unsafeCSS(styles)];

  @property({ type: String })
  title: string = '';

  @property({ type: String })
  name: string = '';

  @property({ type: String })
  summary: string = '';

  @property({ type: String })
  status: string = '';

  @property({ type: String })
  since: string = '';

  @property({ type: Boolean })
  ssrsafe: boolean = false;

  render() {
    return html`
      <a href=${`elements/${this.name.replace('kemet-', '')}`}>
        <h2>${this.title}</h2>
        <code>&lt;${this.name}&gt;</code>
        <p>${this.summary}</p>
      </a>
      <footer>
        <div>
          <span>${this.status}</span>
          ${this.makeSSRSafe()}
        </div>
        <span>since ${this.since}</span>
      </footer>
    `;
  }

  makeSSRSafe() {
    if (this.ssrsafe) {
      return html`&nbsp;<span>ssr safe</span>`;
    }
    return html``;
  }
}
