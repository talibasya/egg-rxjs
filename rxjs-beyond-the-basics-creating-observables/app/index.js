import Rx from 'rxjs'

const bar = Rx.Observable.of(42, 100, 200);

// const bar = Rx.Observable.create(observer => {
//     try {
//         console.log('Hello') || displayInPreview('Hello');
//         observer.next(42);
//         observer.next(100);
//         observer.next(200);
//         setTimeout(function () {
//             observer.next(300);
//             observer.complete();
//         }, 1000);
//     } catch (err) {
//         observer.error(err);
//     }
// })

bar.subscribe(
    function nextValueHandler(x) {
        console.log(x) || displayInPreview(x);
    },
    function errorHandler(err) {
        console.log('Something went wrong: ' + err) || displayInPreview('Something went wrong: ' + err);
    },
    function completeHandler() {
        console.log('done') || displayInPreview('done');
    }
)


// display in plunker preview
function displayInPreview(string) {
    var newDiv = document.createElement("div");
    var newContent = document.createTextNode(string);
    newDiv.appendChild(newContent);
    document.body.appendChild(newDiv)
}

