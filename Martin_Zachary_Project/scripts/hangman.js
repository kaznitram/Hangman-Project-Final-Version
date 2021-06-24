/*
author: Zachary Martin
date:   2021/06/11
note:   final project
*/
let hintArea        = document.getElementById('hintHint');
let guessArea       = document.getElementById('guessThis');
let gameStateArea   = document.getElementById('gameStateText');
let tryAgain        = document.getElementById('again');
let felixImage      = document.getElementById('felix');

const noKeys1        = 10;
const noKeys2        = 9;
const noKeys3        = 7;
const GAMEOVER_value = 6

let randomIndex;
let wordToGuess;
let wordsHint;
let tempGuessSet        = [""];
let incorrectCounter    = 0;
let correctGuessCounter = 0;


// keys of the keyboard
let keys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
            'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
            'Z', 'X', 'C', 'V', 'B', 'N', 'M'];

// possible words to guess
let wordBank = ['ALGORITHM', 'KITTEN', 'OXYGEN',
                'WATERMELON', 'GUITAR', 'METRONOME']

// hints for words in word bank
let hints = ['Hint: a set of steps used in computer science and mathematics',
             'Hint: a baby animal',
             'Hint: humans would perish without this',
             'Hint: it\'s edible',
             'Hint: it has strings',
             'Hint: tempo']


// class for game     *** write if necessary. Check instructions
//class newGame
//{
    //
//}

// select a word from wordbank by random. and loads hint
function randomlySelectWord()
{
    randomIndex = Math.floor(Math.random() * wordBank.length);
    wordToGuess = wordBank[randomIndex];
    wordsHint   = hints[randomIndex];
}

// create buttons of keyboard
function  createKeyboard()
{
    // top row
    for(let i = 0; i < noKeys1; i++)
    {
        let newKey = document.createElement("BUTTON");
        newKey.className = 'keyOption';
        newKey.id        = keys[i];
        newKey.innerText = keys[i];
        document.getElementById('keyboardRow1').append(newKey);
        newKey.onclick = function() {doesKeyMatch(keys[i])};
    }

    //middle row
    for(let i = noKeys1; i < noKeys1 + noKeys2; i ++)
    {
        let newKey = document.createElement("BUTTON");
        newKey.className = 'keyOption';
        newKey.id        = keys[i];
        newKey.innerText = keys[i];
        document.getElementById('keyboardRow2').append(newKey);
        newKey.onclick = function() {doesKeyMatch(keys[i])};
    }

    // bottom row
    for(let i = noKeys1 + noKeys2; i < noKeys1 + noKeys2 + noKeys3; i ++)
    {
        let newKey = document.createElement("BUTTON");
        newKey.className = 'keyOption';
        newKey.id        = keys[i];
        newKey.innerText = keys[i];
        document.getElementById('keyboardRow3').append(newKey);
        newKey.onclick = function() {doesKeyMatch(keys[i])};
    }
}

// show area for guessing the word
function setupGuessArea()
{
    for(let i = 0; i < wordToGuess.length; i++)
    {
        tempGuessSet.push("<li>_</li>");
        guessArea.innerHTML += "<li>_</li>";  
    }
}

// show hint
function showHint()
{
    hintArea.innerText = hints[randomIndex];
}

// check for a match
function doesKeyMatch(value)
{
    console.log("You pressed " + value);
    document.getElementById(value).disabled = true;
    if(wordToGuess.includes(value))
    {
        gameStateArea.innerText = "Correct!\nYou have " + (GAMEOVER_value-incorrectCounter) + " attempts remaining";
        gameStateArea.style.color = "green";
        updateDisplay(value);
        // check win condition
        if(correctGuessCounter == wordToGuess.length)
        {
            gamewin();
        }
    }
    else
    {
        console.log("you guessed wrong");
        incorrectCounter++;
        gameStateArea.innerText = "Wrong Guess! \nYou have " + (GAMEOVER_value-incorrectCounter) + " attempts remaining";
        gameStateArea.style.color = "red";
        felixImage.src = `images/felix${incorrectCounter}.png`;
        fadeIn();
        // if 0 is reached game over
        if(incorrectCounter == 6)
        {
            gameOver();
        }
    }
}

// update guess word display
function updateDisplay(value)
{
    for(let i = 0; i < wordToGuess.length; i++)
    {
        if(wordToGuess.charAt(i) == value)
        {
            tempGuessSet[i+1] = "<li>"+value+"</li>";
            correctGuessCounter++;
        }
    }

    guessArea.innerHTML = "";
    for(let i = 0; i < wordToGuess.length + 1; i++)
    {    
        tempGuessSet.push("<li>_</li>");
        guessArea.innerHTML += tempGuessSet[i];  
    }

}

// fade
function fadeIn() 
{
    let fading = 0;
    felixImage.style.opacity = fading;
    var timer = setInterval(function () 
    {
      if (fading >= 1)
      {
        clearInterval(timer);
      }
      felixImage.style.opacity = fading;
      fading = fading + 0.1;
    }, 50);
}

// game over
function gameOver()
{
    gameStateArea.innerText = "GAME OVER!";
    disableAllKeys();
}

// game won
function gamewin()
{
    gameStateArea.innerText = "CONGRATULATIONS! YOU WON!";
    disableAllKeys();
}

// disable all keys
function disableAllKeys()
{
    for(let i = 0; i < keys.length; i++)
    {
        document.getElementById(keys[i]).disabled = true;
    }
}

// enable all keys
function enableAllKeys()
{
    for(let i = 0; i < keys.length; i++)
    {
        document.getElementById(keys[i]).disabled = false;
    }
}

// new game button
tryAgain.onclick = function() {newGame()};

// new game
function newGame()
{
    // resets everything
    while(tempGuessSet.length > 1) 
    {
        tempGuessSet.pop();
    }

    //tempGuessSet          = [];
    incorrectCounter        = 0;
    correctGuessCounter     = 0;
    gameStateArea.innerText = "";
    guessArea.innerHTML     = "";
    felixImage.src = `images/felix0.png`;

    randomlySelectWord();
    setupGuessArea();
    showHint();
    enableAllKeys();
}


// main
//let game1 = new newGame();
createKeyboard();
randomlySelectWord();
setupGuessArea();
showHint();

