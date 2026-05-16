import { html, LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { svgAnubis } from '../../content/svgs.ts';
import styles from './styles.ts';
import 'kemet-ui/elements/button';
import 'kemet-ui/elements/icon-bootstrap';


@customElement('docs-intro')
export class DocsIntro extends LitElement {
  static styles = [styles];

  render() {
    return html`
      <section>
        <span class="logo">${svgAnubis}</span>
        <h1>Kemet UI</h1>
        <h2>Design<span>{</span>less<span>}</span> Blueprint System</h2>
        <pre><code>npm i kemet-ui</code></pre>
        <br />
        <ul>
          <li>
            <kemet-button link="#get-started" rounded="lg">
              Get Started
              <kemet-icon-bootstrap slot="left" icon="flag" size="20"></kemet-icon-bootstrap>
            </kemet-button>
          </li>
          <li>
            <kemet-button link="/integrations" rounded="lg">
              Integrations
              <kemet-icon-bootstrap slot="left" icon="code-slash" size="20"></kemet-icon-bootstrap>
            </kemet-button>
          </li>
          <li>
            <kemet-button link="/docs" rounded="lg">
              Documentation
              <kemet-icon-bootstrap slot="left" icon="book" size="20"></kemet-icon-bootstrap>
            </kemet-button>
          </li>
        </ul>
      </section>
      <div class="overlay"></div>
    `;
  }
}
