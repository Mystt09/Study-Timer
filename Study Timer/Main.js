import Timer from './Timer.js';

import Extras from './Extras.js';

const test = new Timer();

const helpers = new Extras(); 


window.downloadLogs = () => helpers.downloadLogs();
window.copyLogs = () => helpers.copyLogs();



let elapsedTime = 0;
let start = null;

let startMsg = 'Start: ';

let breakMsg = 'Break: ';

let totalStudyMsg = 'Study: ';
let totalBreakMsg = 'Break: '; 

let elapsedStudyMsg = 'Elapsed Study Time: ';
let elapsedBreakMsg = 'Elapsed Break Time: ';

let totalTimeMsg = 'Total: ';

// Button declaration 

const StartButton = document.getElementById("Start");
const restartButton = document.getElementById("Restart");
const startBreak = document.getElementById("Break");
const EndButton = document.getElementById("End");

const d = new Date();


//display the day of the week 

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const dayName = days[d.getDay()];

document.getElementById("Day").textContent = `${dayName}`; 

// format 
const formattedDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;

document.getElementById("format").textContent = formattedDate; 




let studyCount = 0; 

let breakCount = 0; 

let timeLostCount = 0;

let msStart; 
let msEnd; 
let breakLog;
let msRestart;

let startButtonIsClicked = false; 
let restartBtn = false; 
let breakBtn = false; 
let endBtn = false; 




function starttTime() {

   // if the startbutton is true then display alert 

   //restartClickCount = 0; 

   breakBtn = false; 
   restartBtn = false; 
   endBtn = false; 

  if (startButtonIsClicked){
    
     // if the start button was clicked twice, state that they can only press start once and if they meant restart? 
    document.getElementById("startPopup").textContent = "Start button has already been clicked! Click restart to log a new start time.";
    return;

  }

  startButtonIsClicked = true; 
  

//let start = Date.now();

const d = new Date(); 

let timeDisp = test.time(d);

msStart = d.getTime();



helpers.addLi(startMsg + timeDisp);

if (test.getBreak() != null) { // checks if the break is not empty 

let elapsed = msStart - test.getBreak(); // subtracts the time the break started with the current start time



//let elapsed = msStart - test.getBreak(); // subtracts the time the break started with the current start time


// display elapsed break 

helpers.addLi(elapsedBreakMsg + test.displayElapse(elapsed));


// increase the total break time count 

breakCount = breakCount + elapsed;

 //display total elapsed break time 

helpers.addLi(totalTimeMsg + test.displayElapse(breakCount));

// set the start and break to null for the new values 
test.setBreak(null); 
//ms = null; 

// push to array 

//helpers.startLogs(timeDisp, elapsed);

}


// display for start time 

document.getElementById("TimeStarted").innerHTML = 'Start Time(test): ' + timeDisp;

  
}


window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("Start").addEventListener("click", starttTime);
});

//StartButton.addEventListener("click", starttTime);



function enddTime() {

//let end = stop();

const d = new Date(); 

msEnd = d.getTime();

let timeDisp = test.time(d); // holds the time stopped


helpers.addLi("End: " + timeDisp);

if(msStart != null){

  let elapsed = msEnd - msStart;

  studyCount = studyCount + elapsed; 

  // display the elapsed study time from the last button click 
  
  helpers.addLi(elapsedStudyMsg + test.displayElapse(elapsed));


  msStart = null; 


}

if (test.getBreak() != null) {

  let elapsed = msEnd - test.getBreak(); 

  breakCount = breakCount + elapsed;

  helpers.addLi(elapsedBreakMsg + test.displayElapse(elapsed));

 

}

// will go under "total" 

helpers.addLi(totalStudyMsg + test.displayElapse(studyCount));
helpers.addLi(totalBreakMsg + test.displayElapse(breakCount));



}

EndButton.addEventListener("click", enddTime);

function breakTime(){


  // if the start button or restart button is true, then run 

if(breakBtn){

  // display break message that break has already started 

}

  startButtonIsClicked = false;
  breakBtn = true;

  const d = new Date(); 

  let timeDisp = test.time(d);

  breakLog = d.getTime(); 

  test.setBreak(breakLog); 

  //breakLogs.push(timeDisp);

  document.getElementById("break").innerHTML = 'Break: ' + timeDisp;

  // create a li element for the break time display

  helpers.addLi(breakMsg + timeDisp);

  if (msStart != null){

  let elapsed = breakLog - msStart; 

  //document.getElementById("breakElapsed").innerHTML = 'Elapsed Time: ' + test.displayElapse(elapsed);

  // creates a li element for the elapsed study time 

  helpers.addLi(elapsedStudyMsg + test.displayElapse(elapsed)); 

   //creates a li element for the total study time 

    studyCount = studyCount + elapsed; 
    
  helpers.addLi(totalTimeMsg + test.displayElapse(studyCount));

  msStart = null;

  }

  

  

}  

startBreak.addEventListener("click", breakTime);


