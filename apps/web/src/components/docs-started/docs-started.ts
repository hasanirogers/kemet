import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import hljs from 'highlight.js/lib/core';
import hljsHTML from 'highlight.js/lib/languages/xml';
import hljsJavascript from 'highlight.js/lib/languages/javascript';
import styles from './styles.ts';
import hljsStyles from 'highlight.js/styles/a11y-light.min.css?inline';


@customElement('docs-started')
export class DocsStarted extends LitElement {
  static styles = [styles, unsafeCSS(hljsStyles)];

  @property({ type: Object })
  code: any = {};

  firstUpdated() {
    hljs.registerLanguage('javascript', hljsJavascript);
    hljs.registerLanguage('html', hljsHTML);
    this.shadowRoot?.querySelectorAll('pre code').forEach((block) => {
      const codeBlock = block as HTMLElement;
      hljs.highlightElement(codeBlock);
    });
  }

  render() {
    return html`
      <div>
        <h2>Getting Started</h2>
        <p>Kemet UI components are Web Components. Using a Web Component in your application is as simple as writing HTML for most use cases. Once you've installed Kemet UI write the component in your app like:</p>
        <pre><code class="language-html">&lt;kemet-component property="value"&gt;Some content goes here.&lt;/kemet-component&gt;</code></pre>
        <p>This will work in most places but be sure to checkout out the <a href="/integrations">Integrations page</a> for more details.</p>
      </div>
    `;
  }
}
