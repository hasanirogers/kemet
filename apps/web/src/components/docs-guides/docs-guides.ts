import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from './styles.ts';


@customElement('docs-guides')
export class DocsGuides extends LitElement {
  static styles = [styles];

  render() {
    return html`
      <div>
        <h2>Guides</h2>
        <p>Kemet UI has several guides that will help you get started with the system. Check them out below.</p>
        <ul polarity="dark">
          <li><kemet-button link="/guides/scss" rounded="pill" variant="outlined">Styling with SCSS</kemet-button></li>
          <li><kemet-button link="/guides/forms" rounded="pill" variant="outlined">Working with Forms</kemet-button></li>
          <li><kemet-button link="/guides/using-jsx" rounded="pill" variant="outlined">Web Components and JSX</kemet-button></li>
          <li><kemet-button link="/guides/themes-polarity" rounded="pill" variant="outlined">Themes &amp; Polarity</kemet-button></li>
        </ul>
      </div>
    `;
  }
}
