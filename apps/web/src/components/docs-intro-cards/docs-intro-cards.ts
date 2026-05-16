import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { cards } from './content.ts';
import styles from './styles.ts';

@customElement('docs-intro-cards')
export class DocsIntroCards extends LitElement {
  static styles = [styles];

  render() {
    return html`
      <div>
        <h2>Striving for Excellence</h2>
        <section>
          ${this.makeCards()}
        </section>
      </div>
      <span></span>
    `;
  }

  makeCards() {
    return cards.map((card) => html`
      <figure>
        <span>
          <img src="/intro-card-icons/${card.slug}.svg" alt="${card.title}" />
        </span>
        <h3>${card.title}</h3>
        <figcaption>
          ${card.description}
        </figcaption>
      </figure>
    `)
  }
}
