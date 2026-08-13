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

  render() {
    return html`
      <a href=${`elements/${this.name}`}>
        <h2>${this.title}</h2>
        <code>&lt;${this.name}&gt;</code>
        <p>${this.summary}</p>
      </a>
      <footer>
        <span>${this.status}</span>
        <span>Since ${this.since}</span>
      </footer>
    `;
  }
}
