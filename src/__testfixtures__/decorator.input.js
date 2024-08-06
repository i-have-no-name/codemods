function get() {
  return function () {};
}

function set() {}

class A {}

@set
@get({ a: 1 })
class User extends A {
  log() {
    console.log('hello');
  }
}

export { User };
