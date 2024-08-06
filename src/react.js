module.exports = function (fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // root
  //   .find(j.Expression)
  //   .filter((path) => {
  //     return path.node.type === 'Literal' || path.node.type === 'JSXText';
  //   })
  //   .filter((path) => {
  //     return path.parent.node.type !== 'ImportDeclaration';
  //   })
  //   .replaceWith((path) => {
  //     return j.jsxExpressionContainer(
  //       // {  } // t()
  //       j.callExpression(j.identifier('t'), [j.stringLiteral(path.node.value)]),
  //     );
  //   });

  root
    .find(j.JSXElement)
    .find(j.Expression)
    .filter((path) => {
      return path.node.type === 'Literal' || path.node.type === 'JSXText';
    })
    .replaceWith((path) => {
      return j.jsxExpressionContainer(
        // {  }
        j.callExpression(j.identifier('t'), [j.stringLiteral(path.node.value)]),
      );
    });

  return root.toSource({ quote: 'single' });
};
