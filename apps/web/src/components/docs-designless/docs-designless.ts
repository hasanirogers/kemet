import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { svgBlueprint } from '../../content/svgs.ts';
import styles from './styles.ts';


@customElement('docs-designless')
export class DocsDesignless extends LitElement {
  static styles = [styles];

  render() {
    return html`
      <section>
        <div>
          <h2>Designless Blueprint System?</h2>
          <div class="grid">
            <div>${svgBlueprint}</div>
            <p>A traditional design system comes with, typically, rigid opinions about the look and feel of the system. Kemet UI is different. Consider Kemet UI to be an "ultra minimalist" design system. It's highly configurable and looks and feel how you choose. Instead of baking in a ton of design, Kemet UI acts more like a blueprint for structure. It allows you to reuse the same components across different designs. This is what's meant by "Designless Blueprint System."</p>
          </div>
        </div>
      </section>
    `;
  }
}
