'use strict';

// ****DOM****
/* It is a structured representation of HTML document. It allows JS to access
HTML element and to style/manipulate them. Dom is automatic created by browser
once HTML page is loaded. And it is stored in a tree-structure. In this tree,
each element is one object. DOM methods and properties for DOM manipulation.
But not part of JS. EX- 'document.querySelector()'. DOM is rather part of web
API. Web API's are libraries that also written in JS and automaticly available
for us to use. */

//***HANDLING CLICK-EVENTS***
/* we need to define the SECRET number (just once and outside the eventhandler),
otherwise we cannot compare what user have guessed. Math is an object that
JS gives us and there are lots of methods for Math, ex-random(). This will
give always a random numbner between 1 and 20 (excluding 20). If we 
want including 20, then we just need to add 1 */
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20; //we start with 20(initial score)
let highscore = 0;

// We created this function to follow DRY principal, because this line of code we used few places
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  // console.log(guess, typeof guess);

  if (!guess) {
    displayMessage('⛔ No Number!');
  } else if (guess === secretNumber) {
    displayMessage('🎉 Correct Number!');
    document.querySelector('.number').textContent = secretNumber; //display the number also

    // DOM MANIPULATION, WE CAN ALSO CHANGE CSS(inline-style)
    document.querySelector('.container').classList.remove('playbord');
    document.querySelector('.container').classList.add('winningbord');
    document.querySelector('.number').style.width = '30rem';

    // MANIPULATING HIGHSCOOR (we need to check/update highscore here bcoz player wins here )
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }

    // WHEN 'guess' IS WRONG
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!'); //we used here 'terninary' operator
      score = score - 1;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('💥 Game over');
      document.querySelector('.score').textContent = 0;
    }
  }
});

// To make 'AGAIN' button work or Restart the game
document.querySelector('.again').addEventListener('click', function () {
  // Reassign both variables
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  // Restore all initial conditions
  displayMessage('Start guessing...');
  document.querySelector('.number').textContent = '?';
  document.querySelector('.score').textContent = score; //score=20 will display
  document.querySelector('.guess').value = ''; // it is empy(initially it must be also empty)

  // Restore initial CSS style
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.container').classList.remove('winningbord');
  document.querySelector('.container').classList.add('playbord');
});
