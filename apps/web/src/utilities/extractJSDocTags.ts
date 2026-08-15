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
  let currentClass = '';

  function getTags(node: ts.Node): Record<string, string> {
    const jsDocTags = ts.getJSDocTags(node);
    const tags: Record<string, string> = {};

    jsDocTags.forEach(tag => {
      const tagName = tag.tagName.getText();
      const tagText = typeof tag.comment === 'string'
        ? tag.comment
        : Array.isArray(tag.comment)
        ? tag.comment.map(c => c.text).join('')
        : '';
      tags[tagName] = tagText;
    });

    return tags;
  }

  function visit(node: ts.Node) {
    if (ts.isClassDeclaration(node)) {
      const className = node.name?.getText() || 'AnonymousClass';
      currentClass = className;
      const tags = getTags(node);

      if (Object.keys(tags).length > 0) {
        results.push({
          type: 'class',
          className,
          tags
        });
      }
    } else if (ts.isMethodDeclaration(node)) {
      const methodName = node.name.getText();
      const tags = getTags(node);

      if (Object.keys(tags).length > 0) {
        results.push({
          type: 'method',
          className: currentClass,
          methodName,
          tags
        });
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return results;
}
