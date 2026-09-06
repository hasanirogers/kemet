import { html, LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { state } from 'lit/decorators/state.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import styles from './styles.css?inline';


@customElement('docs-icons')
export default class DocsIcons extends LitElement {
  static styles = [unsafeCSS(styles)];

  @property({ type: String, reflect: true })
  library: string = 'bootstrap';

  @property({ type: String, reflect: true })
  family: string = 'regular';

  @state()
  slugs: string[] = [];

  @state()
  loading: boolean = true;

  @state()
  searchQuery: string = '';

  firstUpdated() {
    this.getIcons();
  }

  render() {
    return html`<div>${this.makeIcons()}</div>`;
  }

  getIcons() {
    console.log('getIcons called with library:', this.library, 'family:', this.family);

    let url: string;

    switch (this.library) {
      case 'fontawesome':
        url = `https://unpkg.com/@fortawesome/fontawesome-free@latest/sprites/${this.family}.svg`;
        break;
      case 'bootstrap':
        url = 'https://unpkg.com/bootstrap-icons@latest/bootstrap-icons.svg';
        break;
      case 'lucide':
        url = 'https://unpkg.com/lucide-static@latest/font/lucide.svg';
        break;
      default:
        url = 'https://unpkg.com/bootstrap-icons@latest/bootstrap-icons.svg';
        break;
    }

    fetch(url)
      .then(response => {
        return response.text();
      })
      .then(xmlString => {
        const spriteMap = (new DOMParser()).parseFromString(xmlString, 'text/xml');
        this.slugs = this.getSlugs(spriteMap);
        this.loading = false;
      })
      .catch(error => {
        console.error('Error fetching icons:', error);
      });
  }

  getSlugs(spriteMap: Document) {
    // get by glyph-name for lucide
    if (this.library === 'lucide') {
      const icons = spriteMap.documentElement.querySelectorAll('glyph');
      const slugs: string[] = [];
      let slug: string | null;

      icons.forEach((icon) => {
        slug = icon.getAttribute('glyph-name');
        if (slug) {
          slugs.push(slug.replace(/^a+-/, ''));
        }
      });

      return slugs;
    }

    // get by id for default
    const icons = spriteMap.documentElement.querySelectorAll('symbol');
    const slugs: string[] = [];
    let slug: string | null;

    icons.forEach((icon) => {
      slug = icon.getAttribute('id');
      if (slug) {
        slugs.push(slug);
      }
    });

    return slugs;
  }

  makeIcons() {
    if (this.loading) {
      return html`<div class="kemet-icons">loading...</div>`;
    }

    const filteredSlugs = this.slugs.filter(slug =>
      slug.toLowerCase().includes(this.searchQuery)
    );

    return html`
      <div class="search-container">
        <input
          type="text"
          placeholder="Search icons..."
          @input=${this.handleSearch}
          .value=${this.searchQuery}
        />
      </div>
      <ul class="kemet-icons">
        ${filteredSlugs.map(slug => html`
          <li>
            <figure>
              <kemet-icon name=${slug} size="32" library=${this.library} family=${ifDefined(this.family)}></kemet-icon>
              <figcaption>${slug}</figcaption>
            </figure>
          </li>
        `)}
      </ul>
    `;
  }

  handleSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value.toLowerCase();
  }
}
