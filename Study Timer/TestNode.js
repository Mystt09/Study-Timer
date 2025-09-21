/*
let test = new Timer();

let startTimer = test.start();

console.log(startTimer); 
*/

// uses method from the Timer class 

// UNCOMMENT WHEN TESTING WITH NODE.JS

const Timer = require('./Timer.js')

import { timer } from './Timer.js';

 module.import = Timer;

 


const test = new Timer();
//const start = Date.now();

console.log("starting timer...");
// Expected output: "starting timer..."

//let startTime = test.start(); 

//for testing 



//const start = Date.now();

//TEST
test.start();

// simulate 5 mins 
test.startTime = Date.now();
test.endTime = test.startTime + 987654321;

let el = test.endTime - test.startTime;

const elapsed = test.displayElapse(el); 

console.log("Time elapsed:", elapsed);

let startTime = test.start(); 

//console.log("starting timer...");
// Expected output: "starting timer..."

/*

setTimeout(() => {

  const ms = Date.now() - startTime;

  console.log(`seconds elapsed = ${Math.floor(ms / 1000)}`);
  // Expected output: "seconds elapsed = 2"
}, 2000);
*/

console.log("time started:" + startTime); 

let endTime = startTime + 300000;

console.log("time started:" + endTime); 

let elasped = test.displayElapse();

console.log("time elasped:" + elasped); 

// if you are making functions outside of a special class, then delcare it as a function 

function Alert() { 

  alert("hi");
}

let elapsedTime = 0;
let start = null;


const StartButton = document.getElementById("Start");

/*
StartButton.addEventListener("click", function() {
    console.log("Button clicked!");
});

*/

//document.getElementById("Start").addEventListener("click", starttTime());

//StartButton.addEventListener("click", starttTime);

function starttTime() {

let starty = test.start().toLocaleString();

return console.log("Current Start Time: " + starty);
//document.getElementById("Time").innerHTML = 'Current Start Time: ' + starty;
//return console.log("current start time: " + starty);
//test.startTime = Date.now();

//console.log(test.startTime);
//start = start(); 

//return test.startTime;
  
}


StartButton.addEventListener("click", starttTime);


//console.log(starttTime());

// when the pause button is clicked 

function enddTime() {

//let end = stop();

test.endTime = test.startTime + 987654321;

 //elapsedTime = elapsedTime + (test.endTime - test.startTime);
//console.log(currElapsed);
//calc elapsed 
return test.endTime;

}

console.log(enddTime());

function currElapsed() {

  elapsedTime = elapsedTime + (enddTime() - starttTime());

  let elap = test.displayElapse(elapsedTime); // displayElapse(currElapsed)

  return elap; 


}

console.log(currElapsed());

function endSession() {



}
// elapsed time = 0; 


  // if the start button is pressed then start time 

  // if the break, end, or pause button is pressed, then stop time

  // currElapsed = currElapsed + (end() - start())

  // display(elapsed)

  // then repeat until the end button is pressed 

/*



setTimeout(() => {
  const ms = Date.now() - start;

  console.log(`seconds elapsed = ${Math.floor(ms / 1000)}`);
  // Expected output: "seconds elapsed = 2"
}, 2000);

*/
