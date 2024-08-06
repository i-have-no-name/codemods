module.exports = function (fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  const program = root.get().value.program;

  // import { compose } from 'lodash';
  const import_compose = j.importDeclaration.from({
    specifiers: [j.importSpecifier(j.identifier('compose'))],
    source: j.literal('lodash'),
  });

  // insert at the head of the source code
  program.body = [import_compose, ...program.body];


  root
    .find(j.ClassDeclaration)
    .filter((path) => {
      return path.node.decorators;
    })
    .replaceWith((path) => {
      const decorators = path.node.decorators;

      path.node.decorators = [];

      // invariant rule. class declaration can't use as an argument.
      const class_expression = j.classExpression.from({
        id: path.node.id,
        body: path.node.body,
        superClass: path.node.superClass,
      });

      // const ClassName = compose(fs)(class)
      const variable = j.variableDeclaration('const', [
        j.variableDeclarator(
          j.identifier(path.node.id.name),
          j.callExpression(
            j.callExpression(j.identifier('compose'), [
              ...decorators.map((p) => p.expression),
            ]),
            [class_expression],
          ),
        ),
      ]);

      return variable;
    });

  return root.toSource({ quote: 'single' });
};
