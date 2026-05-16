import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from './styles.ts';
import { stylesShared } from '../../styles/shared.ts';
import KemetDrawer from 'kemet-ui/elements/drawer';


@customElement('docs-hamburger')
export class DocsHamburger extends LitElement {
  static styles = [stylesShared, styles];
  render() {
    return html`
      <button @click=${(event: PointerEvent) => this.handleClick(event)}>
        <kemet-icon-bootstrap icon="list" size="32"></kemet-icon-bootstrap>
      </button>
    `;
  }

  handleClick(event: PointerEvent) {
    event.preventDefault();
    const drawer = document.querySelector('kemet-drawer') as KemetDrawer;
    console.log(drawer);
    drawer.opened = !drawer.opened;
  }
}
