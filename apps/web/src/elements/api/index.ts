import { html, LitElement, unsafeCSS } from 'lit';
import { property } from '@lit/reactive-element/decorators/property.js';
import styles from './styles.css?inline';


export class ApiElement extends LitElement {
  static styles = [unsafeCSS(styles)];

  @property({ type: Array })
  data: any[] = [];

  @property({ type: String })
  type: string = '';

  render() {
    return this.makeType();
  }

  private makeType() {
    switch (this.type) {
      case 'attributes':
        return this.makeAttributes();
      case 'slots':
        return this.makeSlots();
      case 'events':
        return this.makeEvents();
      case 'methods':
        return this.makeMethods();
      case 'properties':
        return this.makeCssProperties();
      case 'parts':
        return this.makeCssParts();
      default:
        return html``;
    }
  }

  private makeAttributes() {
    if (!this.data || this.data.length === 0) {
      return html`<p>This element doesn't have any attributes.</p>`;
    }

    const rows = this.data.map((attr) => html`<tr><td>${attr.name}</td><td>${attr.description}</td><td><em>${attr.type.text}</em></td></tr>`);
    return html`
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `;
  }

  private makeSlots() {
    if (!this.data || this.data.length === 0) {
      return html`<p>This element doesn't have any slots.</p>`;
    }

    const rows = this.data.map((slot) => html`<tr><td>${slot.name}</td><td>${slot.description}</td></tr>`);
    return html`
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `;
  }

  private makeEvents() {
    if (!this.data || this.data.length === 0) {
      return html`<p>This element doesn't have any events.</p>`;
    }

    const rows = this.data.map((event) => html`<tr><td>${event.name}</td><td>${event.description}</td></tr>`);
    return html`
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `;
  }

  private makeMethods() {
    if (!this.data || this.data.length === 0) {
      return html`<p>This element doesn't have any methods.</p>`;
    }

    const rows = this.data.map((method) => html`<tr><td>${method.name}</td><td>${method.description}</td></tr>`);
    return html`
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `;
  }

  private makeCssProperties() {
    if (!this.data || this.data.length === 0) {
      return html`<p>This element doesn't have any CSS Properties.</p>`;
    }

    const rows = this.data.map((prop) => html`<tr><td>${prop.name}</td><td>${prop.description}</td></tr>`);
    return html`
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `;
  }

  private makeCssParts() {
    if (!this.data || this.data.length === 0) {
      return html`<p>This element doesn't have any CSS Parts.</p>`;
    }

    const rows = this.data.map((part) => html`<tr><td>${part.name}</td><td>${part.description}</td></tr>`);
    return html`
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `;
  }
}

customElements.define('web-api', ApiElement);
