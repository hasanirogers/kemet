import { render } from '@lit-labs/ssr';
import type { TemplateResult } from 'lit';

export default function renderLit(template: TemplateResult): string {
  let html = '';
  for (const chunk of render(template)) {
    html += chunk;
  }
  return html;
}
