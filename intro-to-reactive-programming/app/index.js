import Rx from 'rxjs'

const button = document.querySelector('.button');
const label = document.querySelector('h4');
const refresh = document.querySelector('.refresh')

const close1 = document.querySelector('.close1')
const close2 = document.querySelector('.close2')
const close3 = document.querySelector('.close3')



const clickStream = Rx.Observable.fromEvent(button, 'click');

const close1Stream = Rx.Observable.fromEvent(close1, 'click');
const close2Stream = Rx.Observable.fromEvent(close2, 'click');
const close3Stream = Rx.Observable.fromEvent(close3, 'click');
// const clickStream = Rx.Observable.of('1', '2', '3', '4')

const doubleClickStream = clickStream
    .bufferWhen(() => clickStream.debounceTime(250))
    .map(arr => arr.length)
    .filter(len => len === 2);

doubleClickStream.subscribe(event => {
    label.textContent = 'double click';
});

doubleClickStream
    .delay(1000)
    .subscribe(suggestion => {
        label.textContent = '-';
    });

// 4
const startupRequestStream = Rx.Observable.of('https://api.github.com/users');
const refreshClickStream = Rx.Observable.fromEvent(refresh, 'click')

var requestOnRefreshStream = refreshClickStream
    .map(ev => {
        var randomOffset = Math.floor(Math.random() * 500);
        return 'https://api.github.com/users?since=' + randomOffset;
    });

// flatMap is now an alias for mergeMap
// but will work just the same.
var responseStream = requestOnRefreshStream.merge(startupRequestStream)
    .flatMap(requestUrl =>
        Rx.Observable.fromPromise(fetch(requestUrl))
    ).flatMap(response =>
        Rx.Observable.fromPromise(response.json())
    ).shareReplay(1)

function getRandomUser(listUser) {
    return listUser[Math.floor(Math.random() * listUser.length)]
}

function createSuggestionStream(responseStream, closeStream) {
    return responseStream.map(listUser =>
        listUser[Math.floor(Math.random() * listUser.length)]
    ).startWith(null)
    .merge(refreshClickStream.map(() => null))
    .merge(closeStream.withLatestFrom(responseStream, (x, R) => getRandomUser(R)))
}

var suggestion1Stream = createSuggestionStream(responseStream, close1Stream);
var suggestion2Stream = createSuggestionStream(responseStream, close2Stream);
var suggestion3Stream = createSuggestionStream(responseStream, close3Stream);

function renderSuggestion(suggestedUser, selector) {
    var suggestionEl = document.querySelector(selector);
    if (suggestedUser === null) {
      suggestionEl.style.visibility = 'hidden';
    } else {
      suggestionEl.style.visibility = 'visible';
      var usernameEl = suggestionEl.querySelector('.username');
      usernameEl.href = suggestedUser.html_url;
      usernameEl.textContent = suggestedUser.login;
      var imgEl = suggestionEl.querySelector('img');
      imgEl.src = "";
      imgEl.src = suggestedUser.avatar_url;
    }
}

suggestion1Stream.subscribe(user => {
    renderSuggestion(user, '.suggestion1');
});

suggestion2Stream.subscribe(user => {
    renderSuggestion(user, '.suggestion2');
});

suggestion3Stream.subscribe(user => {
    renderSuggestion(user, '.suggestion3');
});