import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './styles.ts';
import { svgAnubis } from '../../content/svgs.ts';


@customElement('docs-nav')
export class DocsNav extends LitElement {
  static styles = [styles];

  @property()
  location: string = 'content';

  render() {
    return html`
      <section>
        <header>
          <a href="/">
            <div class="logo">${svgAnubis}</div>
            <h2>Kemet UI</h2>
          </a>
        </header>
        <nav>
          <h3>Integrations</h3>
          <a href="/integrations#react">React</a>
          <a href="/integrations#react-legacy">React (Legacy)</a>
          <a href="/integrations#angular">Angular</a>
          <a href="/integrations#vue">Vue</a>
          <a href="/integrations#alpine">Alpine</a>
          <a href="/integrations#next">NextJS</a>
          <a href="/integrations#svelte">Svelte</a>
          <a href="/integrations#lit">Lit</a>
          <a href="/integrations#solid">Solid</a>
          <a href="/integrations#marko">Marko</a>
        </nav>
        <nav>
          <h3>Guides</h3>
          <a href="/guides/scss">Styling with SCSS</a>
          <a href="/guides/forms">Working with Forms</a>
          <a href="/guides/using-jsx">Web Components and JSX</a>
          <a href="/guides/themes-polarity">Themes &amp; Polarity</a>
        </nav>
      </section>
      <div class="background"></div>
    `;
  }
}
