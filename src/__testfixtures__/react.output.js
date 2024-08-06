import React from 'react';

export class Example_1 extends React.PureComponent {
  render() {
    return <FC title={t('Hello world')} />;
  }
}

export function Example_2() {
  return <div>{t('a')}</div>;
}
