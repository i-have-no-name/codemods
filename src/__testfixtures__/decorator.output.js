import { compose } from 'lodash';
function get() {
  return function () {};
}

function set() {}

class A {}

const User = compose(set, get({ a: 1 }))(class User extends A {
  log() {
    console.log('hello');
  }
});

export { User };
