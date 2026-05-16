import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from './styles.ts';
import { integrations } from './content.ts';

@customElement('docs-everywhere')
export class DocsEverywhere extends LitElement {
  static styles = [styles];

  render() {
    return html`
      <div>
        <h2>Kemet UI Works Everywhere</h2>
        <ul>${this.makeIntegrations()}</ul>
        <p>Regardless of what framework or library you use, Kemet UI will work. That's power of Web Components. Some frameworks have caveats though. Be sure to check out the integration guides for more details.</p>
      </div>
    `;
  }

  makeIntegrations() {
    return integrations.map((framework) => html`
      <li>
        <figure>
          <a href="/integrations/#${framework.slug}">
            ${framework.svg}
            <figcaption>
              ${framework.name}
            </figcaption>
          </a>
        </figure>
      </li>
    `);
  }
}
