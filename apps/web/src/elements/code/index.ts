import { html, LitElement, svg, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement, property, state } from 'lit/decorators.js';

import hljs from 'highlight.js';
import hljscss from 'highlight.js/styles/github-dark.css?inline';
import * as js_beautify from 'js-beautify';

import styles from './styles.css?inline';
import nativeStyles from '../../../../../packages/ui/dist/styles/native.css?inline';
import utilityStyles from '../../../../../packages/ui/dist/styles/utilities.css?inline';

@customElement('web-code')
export class WebCode extends LitElement {
  static styles = [unsafeCSS(styles), unsafeCSS(hljscss), unsafeCSS(nativeStyles), unsafeCSS(utilityStyles)];

  @property({ type: String })
  code = '';

  @property({ type: String })
  language = 'html';

  @state()
  prettifiedCode = '';

  @state()
  highlightedCode = '';

  @state()
  showCode = false;

  @state()
  polarity: 'light' | 'dark' = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';

  /** @internal */
  private intersectionObserver: IntersectionObserver | null = null;

  private prettifyCode(code: string): string {
    try {
      if (typeof code !== 'string') {
        console.error('Code is not a string:', typeof code);
        return String(code);
      }

      // First, manually add line breaks to the minified HTML
      let formatted = code
        .replace(/></g, '>\n<')
        .replace(/(\n\s*)+/g, '\n'); // Remove extra whitespace

      // Then use js-beautify for proper indentation
      const beautified = js_beautify.html(formatted, {
        indent_size: 2,
        preserve_newlines: true,
        max_preserve_newlines: 2,
        end_with_newline: true,
        wrap_line_length: 0,
        unformatted: [],
        content_unformatted: [],
        extra_liners: [],
      });
      return beautified;
    } catch (error) {
      console.error('Error prettifying code:', error);
      return code;
    }
  }

  willUpdate(changedProperties: any) {
    if (changedProperties.has('code')) {
      this.prettifiedCode = this.prettifyCode(this.code);
      this.highlightedCode = hljs.highlight(this.prettifiedCode, { language: this.language }).value;
    }
  }

  updated() {
    const scripts = this.code.match(/<script[^>]*>[\s\S]*?<\/script>/g);
    if (scripts) {
      // Use requestAnimationFrame to ensure DOM is rendered
      requestAnimationFrame(() => {
        const shadowRoot = this.shadowRoot;
        scripts.forEach((script) => {
          const scriptContent = script.replace(/<script[^>]*>/g, '').replace(/<\/script>/g, '');
          // Execute with shadow root context for element queries
          try {
            const scriptFunction = new Function('shadowRoot', 'document', scriptContent);
            scriptFunction(shadowRoot, document);
          } catch (error) {
            console.error('Script execution error:', error);
          }
        });
      });
    }

    const styles = this.code.match(/<style[^>]*>[\s\S]*?<\/style>/g);
    if (styles) {
      requestAnimationFrame(() => {
        const shadowRoot = this.shadowRoot;
        if (!shadowRoot) return;
        styles.forEach((style) => {
          const styleContent = style.replace(/<style[^>]*>/g, '').replace(/<\/style>/g, '');
          const styleElement = document.createElement('style');
          styleElement.textContent = styleContent;
          shadowRoot.appendChild(styleElement);
        });
      });
    }

    // Load icons after HTML is rendered
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const shadowRoot = this.shadowRoot;
        if (!shadowRoot) return;
        const icons = shadowRoot.querySelectorAll('kemet-icon');
        icons.forEach((icon) => {
          // Force custom element upgrade if needed
          customElements.upgrade(icon);
          // Then trigger loading
          if ((icon as any).loadIcon) {
            (icon as any).loadIcon();
          }
        });
      });
    });
  }

  render() {
    const dynamicallyRenderedHTML = this.addDynamicProperties(this.code);
    return html`
      <figure class="${this.polarity}">${unsafeHTML(dynamicallyRenderedHTML)}</figure>
      <div ?hidden=${!this.showCode}>
        <pre><code class="language-${this.language}">${unsafeHTML(this.highlightedCode)}</code></pre>
      </div>
      <footer>
        <button @click=${() => (this.showCode = !this.showCode)}>Code</button>
        <button @click=${() => this.togglePolarity()}>
         ${this.makePolarityIcon()}
        </button>
      </footer>
    `;
  }

  private togglePolarity() {
    this.polarity = this.polarity === 'dark' ? 'light' : 'dark';
    console.log(this.polarity);
  }

  private makePolarityIcon() {
    const sun = svg`
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brightness-high-fill" viewBox="0 0 16 16">
        <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
      </svg>
    `;

    const moon = svg`
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-stars-fill" viewBox="0 0 16 16">
        <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/>
        <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"/>
      </svg>
    `;

    if (this.polarity === 'light') {
      return html`${sun}`;
    }
    return html`${moon}`;
  }

  private addDynamicProperties(html: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    doc.querySelectorAll(':not(html):not(head):not(body)').forEach(element => {
      const tagName = (element as HTMLElement).tagName.toLowerCase();
      if (tagName.includes('kemet-')) {
        (element as HTMLElement).setAttribute('polarity', this.polarity);
      }
    });

    // Remove style tags from rendered HTML (they'll be added to shadow root separately)
    doc.querySelectorAll('style').forEach(style => style.remove());

    return doc.body.innerHTML;
  }
}
