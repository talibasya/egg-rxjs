# Rxjs beyond the basics

(egghead.io)

## 1-5. Create observable

Understanding basic flow of `observable`. Comparing with `function` and `generator`. Represent `observe` methods.

## 6 of

Show another example using operator `of`.

## 7 convert values to observables

Show technic to create observables from js using several operators like: `from`, `fromPromise`, `fromArray`

## 8 Convert DOM and Node.js Streams to RxJS

Show `fromEvent` and `fromEventPattern` under the hood.

```javascript
var foo = Rx.Observable.from(arr);

function addEventHandler(handler) {
  document.addEventListener('click', handler);
}
function removeEventHandler(handler) {
  document.removeEventListener('click', handler);
}

// var foo = Rx.Observable.fromEventPattern(
//   addEventHandler, removeEventHandler
// );

var foo = Rx.Observable.fromEvent(document, 'click');

foo.subscribe(...)
```

## 9 Combine empty, never, and throw Operators with Observables

This lesson introduces operators `empty()`, `never()`, and `throw()`.

## 10 Set Intervals with RxJS interval and timer

Set interval or timer using rx methods

## 11 Understand the RxJS create Operator

```javascript
const foo = Rx.Observable.create(...)
const foo =  new Rx.Observable(...) // the same

// example with object and its next error complete properties.

```

## 12 Return Subscriptions from the Subscribe

```javascript
var foo = new Rx.Observable(function subscribe(observer) {
  var id = setInterval(function () {
    observer.next('hi')
  }, 1000)
  return function unsubscribe() {
    clearInterval(id);
  }
})

var subscription = foo.subscribe({
  next: function (x) { console.log('next ' + x) },
  error: function (err) { console.log('error ' + err) },
  complete: function () { console.log('done') },
});

setTimeout(function () {
  subscription.unsubscribe()
}, 4500)

```

## 13 Observables are the foundation

Explain that it is more useful with several operators.