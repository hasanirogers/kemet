import * as ts from 'typescript';
import { resolve } from 'path';

export default function extractJSDocTags(filePath: string) {

  const absolutePath = resolve(process.cwd(), '../../packages/ui', filePath);
  const fileContent = ts.sys.readFile(absolutePath);

  if (!fileContent) {
    return [];
  }

  const sourceFile = ts.createSourceFile(
    absolutePath,
    fileContent,
    ts.ScriptTarget.Latest,
    true
  );

  const results: any[] = [];

  function visit(node: ts.Node) {
    if (ts.isClassDeclaration(node)) {
      const jsDocTags = ts.getJSDocTags(node);
      const tags: Record<string, string> = {};

      jsDocTags.forEach(tag => {
        const tagName = tag.tagName.getText();
        const tagText = typeof tag.comment === 'string' ? tag.comment : '';
        tags[tagName] = tagText;
      });

      if (Object.keys(tags).length > 0) {
        results.push({
          className: node.name?.getText(),
          tags
        });
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return results;
}
