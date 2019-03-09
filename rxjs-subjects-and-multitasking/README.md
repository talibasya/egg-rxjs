# RxJS subjects and multicasting operators

(egghead.io)

## 1-2. Intro subject (Observable and Observer hybrid)

Prepare on observe instead calling `subscribe` twice

## 3. Using a Subject as an Event Bus

We can freely use the methods `next` `error` `complete` manually, but it breaks reactive pattern

## 4. BehaviorSubject: representing a value over time

Fetching current state of observable independ of time of subscribtion. (`subscribe` emits `next` with last value)

## 5. ReplaySubject: remembering events from the past

Fetching all events independ of time.

## 6. AsyncSubject: representing a computation that yields a final value

Emits after complete.

## 7. Connection operator: multicast and connect

Create `connectableObservable` with `Subject` inside.

## 8. Stopping a shared observable execution

## 9. RefCount: automatically starting and stopping an execution

## 10. Multicasting shortcuts: publish() and variants

There are couple of values to create broadcast subject for observable.

- `publish`:

```js
var shared = Rx.Observable.interval(1000).publish(); // .multicast(new Subject())
```

- `publishReplay`

```js
var shared = Rx.Observable.interval(1000).publishReplay(); // .multicast(new ReplaySubject())
```

- `publishBehavior`

```js
var shared = Rx.Observable.interval(1000).publishBehavior(); // .multicast(new BehaviorSubject())
```

- `publishLast`

```js
var shared = Rx.Observable.interval(1000).publishLast(); // .multicast(new AsyncSubject())
```

- `share`

```js
var shared = Rx.Observable.interval(1000).share(); // .publish().refCount()
```

## 11. Reusable multicasting with Subject factories

Replace `multicast` input parameter to function, which creates Subject.

## 12. Multicast with a selector argument, as a sandbox

Merging observable and avoid extra executions.

The reason is because we have `merge` with `sharedDelayed` which subscribes `shared`. So in this case observer subscribes to `shared` twice.