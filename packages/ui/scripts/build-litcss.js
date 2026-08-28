import { glob } from 'glob';
import fs from 'node:fs/promises';
import path from 'node:path';

const cssFiles = await glob('src/elements/**/*.css');

for (const file of cssFiles) {
  // Skip existing generated files if any
  if (file.endsWith('.css.ts')) continue;

  const cssContent = await fs.readFile(file, 'utf8');
  const tsContent = `import { css } from 'lit';\n\nexport default css\`${cssContent.replace(/`/g, '\\`').replace(/\${/g, '\\${')}\`;\n`;

  const outputPath = `${file}.ts`; // e.g., styles.css.ts
  await fs.writeFile(outputPath, tsContent, 'utf8');
  console.log(`[CSS -> TS] Generated: ${outputPath}`);
}
