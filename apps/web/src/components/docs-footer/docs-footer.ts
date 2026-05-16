import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from './styles.ts';

@customElement('docs-footer')
export class DocsFooter extends LitElement {
  static styles = [styles];
  render() {
    return html`
      <footer>
        <span>
          ${this.getYear()} Kemet UI
        </span>
        <nav>
          <a href="/">Home</a>
          <a href="https://github.com/hasanirogers/kemet-ui">GitHub</a>
          <a href="/docs">Docs</a>
        </nav>
      </footer>
    `;
  }

  getYear() {
    const date = new Date();
    return date.getFullYear();
  }
}
