export { property, state, query, queryAll } from 'lit/decorators.js';
import { customElement as litCustomElement } from 'lit/decorators.js';

/**
 * A drop-in replacement for lit's `customElement` decorator that is safe under
 * hot-module-replacement / live-reload environments where the module may be
 * re-evaluated.
 */
export const customElement = (tagName: string) => (classOrDescriptor: any) =>
  typeof customElements !== 'undefined' && !customElements.get(tagName)
    ? litCustomElement(tagName)(classOrDescriptor)
    : classOrDescriptor;
