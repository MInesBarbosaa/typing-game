const quotes = [
    'Things are only impossible until they are not',
    'It is possible to commit no errors and still lose. That is not a weakness. That is life',
    'There is a way out of every box, a solution to every puzzle; it is just a matter of finding it.',
    'Without freedom of choice there is no creativity',
    'Logic is the beginning of wisdom, not the end',
    'Improve a mechanical device and you may double productivity. But improve yourself, you gain a thousandfold',
    'Compassion: that is the one thing no machine ever had. Maybe it is the one thing that keeps us ahead of them.',
];


const quote = document.getElementById('quote'); // go to the document and take the element that has the id quote
const input = document.getElementById('typed-value');
const start = document.getElementById('start');
const message = document.getElementById('message');

let targetWord;
let highlightPosition;
let startTime;

function startGame() {

    const quoteIndex = Math.floor(Math.random() * quotes.length);  // math is provided by JS

    //console.log('Game Started!');

    //targetWord = "type me now"; //set the value of this target word to the user
    
    quoteText = quotes[quoteIndex];
    //quoteText = "type me now";

    wordQueue = quoteText.split(' '); // split the string in the space
    //quote.innerHTML = `<span>${targetWord}</span>`; //creates a span with the words presented in the variable targetWord
    quote.innerHTML = wordQueue.map(word => (`<span>${word}</span>`)).join(''); // its a loop over each word that is typed

        highlightPosition = 0;
        quote.childNodes[highlightPosition].className = 'highlight';

        startTime = new Date().getTime(); // give the time in ms
        //console.log(startTime);

        document.body.className = ``;
        start.className = "started";

}

function checkInput() {
    //console.log('Checking Input');
    //const currentWord = wordQueue[0]; // sets first word in array in currentWord
    const currentWord = wordQueue[0].replaceAll(".", "").replaceAll(",", "").replaceAll(":", "").replaceAll(";", ""); // if it find any of this pontuation, it replaces it for a space
    
    
    // const currentWord = targetWord;
    const typedValue = input.value.trim(); //trim is to the code does not consider spaces, makes it easier
    // gets value from input and removes spaces

    if (currentWord !== typedValue) {
        input.className = currentWord.startsWith(typedValue) ? '' : 'error'; // ternary operators
        return;
    }

    wordQueue.shift(); // removes the first item in the word queue array
    input.value = ''; //empties textbox

    quote.childNodes[highlightPosition].className = ""; // removes the class
    
    if (wordQueue.length === 0){
        gameOver ();
        return;
    }

    highlightPosition++; // incrementing highlight position
    quote.childNodes[highlightPosition].className = 'highlight';
}

function gameOver() {

    const elapsedTime = new Date().getTime() - startTime;
    document.body.className = "winner";
    
    message.innerHTML = `<span class="congrats">Congratulations!</span>
    <br>You finished in ${elapsedTime/1000} seconds.`;
}

input.value = ''; // clear the input

start.addEventListener('click', startGame); // When a click is done, the function starGame is called
input.addEventListener('input', checkInput);
