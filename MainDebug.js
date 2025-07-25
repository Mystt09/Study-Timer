const test = new Timer();

function Alert() { 

  alert("hi");
}

let elapsedTime = 0;
let start = null;


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
//const d = new Date(); 

// ARRAY

let startLogs = []; 
let restartLogs = [];
let breakLogs = [];
let endLogs = []; 


let startButtonIsClicked = false; 
let restartBtn = false; 
let breakBtn = false; 
let endBtn = false; 

function resetAllFlags() {
  startButtonIsClicked = false;
  restartBtn = false;
  breakBtn = false;
  endBtn = false;
}


function starttTime() {

   // if the startbutton is true then display alert 

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

//TimeStarted = 'Start Time: ' + starty;

// log the time 

startLogs.push(timeDisp);

/* looping through your array more lengthy : 
for (let i = 0;i < timeLogs.length; i++) {
     // appending your elements to the body :
     document.body.appendChild(timeLogs[i]);
}
*/
var li = document.createElement("li");

li.innerHTML = 'Start Time: ' + timeDisp;

document.getElementById("Logs").appendChild(li);

if (test.getBreak() != null) { // checks if the break is not empty 


let lii1 = document.createElement("li");

let elapsed = msStart - test.getBreak(); // subtracts the time the break started with the current start time


// display elapsed break 

lii1.innerHTML = 'Elapsed Break time: ' + test.displayElapse(elapsed); 

document.getElementById("Logs").appendChild(lii1);

 //display total elapsed break time 

let lii2 = document.createElement("li");

// increase the total break time count 
breakCount = breakCount + elapsed;

lii2.innerHTML = 'Total Break time: ' + test.displayElapse(breakCount);

document.getElementById("Logs").appendChild(lii2);

// set the start and break to null for the new values 
test.setBreak(null); 
//ms = null; 

}


// display for start time 

document.getElementById("TimeStarted").innerHTML = 'Start Time(test): ' + timeDisp;

  
}



StartButton.addEventListener("click", starttTime);

let prev = null; // previous restart value 

function restart() {

  startButtonIsClicked = false;
  //restartBtn = true;
  //breakBtn = false; 

  if(breakBtn){ 

     document.getElementById("breakPopup").textContent = "Restart can only be used to start a new time log.";

     breakBtn = false; 
     return;


  } 


  // if the restart button has been clicked again, then calc elapsed time lost from the last restart 

  

  //startButtonIsClicked = false;
  restartBtn = true;
  //breakBtn = false; 

  
const d = new Date(); 

let timeDisp = test.time(d);

msRestart = d.getTime();



restartLogs.push(timeDisp);

var li = document.createElement("li");

li.innerHTML = 'Restart: ' + timeDisp;

document.getElementById("Logs").appendChild(li);

if (msStart != null) { // checks if there is a value for msStart

    let elapsed = msRestart - msStart;

    
    // Log time lost
    var lostLi = document.createElement("li");
    lostLi.innerHTML = 'Elapsed Time Lost: ' + test.displayElapse(elapsed);
    document.getElementById("Logs").appendChild(lostLi);

    // Update total lost time
    timeLostCount += elapsed;

    prev = msRestart; 

    var totalLostLi = document.createElement("li");
    totalLostLi.innerHTML = 'Total Time Lost: ' + test.displayElapse(timeLostCount);
    document.getElementById("Logs").appendChild(totalLostLi);

    msStart = null;

    //msRestart = null; 

  } 

  // when the restart button has been clicked again, we would want to calc the time lost from the last restart 
  // prev will always store the prev restart time 

  
  else if(restartBtn) { //if the restart button was clicked again, then calc 

   if(prev != null) {

    // let msRestartAgain = d.getTime();

    let elapsed = msRestart - prev; 

    var lostLi = document.createElement("li");
    lostLi.innerHTML = 'Elapsed Time Lost: ' + test.displayElapse(elapsed);
    document.getElementById("Logs").appendChild(lostLi);

    // Update total lost time
    timeLostCount += elapsed;

    var totalLostLi = document.createElement("li");
    totalLostLi.innerHTML = 'Total Time Lost: ' + test.displayElapse(timeLostCount);
    document.getElementById("Logs").appendChild(totalLostLi);

    msRestart = null; 
    prev = null; 


     }
     

  
  }

  //msRestart = null; 
 

}

restartButton.addEventListener("click", restart);


function enddTime() {

//let end = stop();

const d = new Date(); 

msEnd = d.getTime();

let timeDisp = test.time(d); // holds the time stopped

endLogs.push(timeDisp);

 //elapsedTime = elapsedTime + (test.endTime - test.startTime);
//console.log(currElapsed);
//calc elapsed 
document.getElementById("TimeEnded").innerHTML = 'End Time: ' + timeDisp;

var li = document.createElement("li");

li.innerHTML = 'End Time: ' + timeDisp;

document.getElementById("Logs").appendChild(li);

if(msStart != null){

  let elapsed = msEnd - msStart;

  studyCount = studyCount + elapsed; 

  // display the elapsed study time from the last button click 
  var elaps = document.createElement("li");
  elaps.innerHTML = 'Elapsed Study Time: ' + test.displayElapse(elapsed);
  document.getElementById("Logs").appendChild(elaps);

  document.getElementById("elapsed").innerHTML = 'Elapsed Time(test): ' + test.displayElapse(elapsed);

  var total = document.createElement("li");
  total.innerHTML = 'Total Study Time: ' + test.displayElapse(studyCount);
  document.getElementById("Logs").appendChild(total);

  msStart = null; 


}

if (test.getBreak() != null) {

  let elapsed = msEnd - test.getBreak(); 

  var lii1 = document.createElement("li");
  lii1.innerHTML = 'Elapsed Break time: ' + test.displayElapse(elapsed);
  document.getElementById("Logs").appendChild(lii1);

  breakCount = breakCount + elapsed;

  var lii2 = document.createElement("li");
  lii2.innerHTML = 'Total Break time: ' + test.displayElapse(breakCount);
  document.getElementById("Logs").appendChild(lii2);

  test.setBreak(null);
  msBreakStart = null;


}

  var totalLost = document.createElement("li");
  totalLost.innerHTML = 'Total Time Lost: ' + test.displayElapse(timeLostCount);
  document.getElementById("Logs").appendChild(totalLost);



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

  breakLogs.push(timeDisp);

  document.getElementById("break").innerHTML = 'Break: ' + timeDisp;

  // create a li element for the break time display

  var li = document.createElement("li");

  li.innerHTML = 'Break: ' + timeDisp;

  document.getElementById("Logs").appendChild(li);

  if (msStart != null){

  let elapsed = breakLog - msStart; 

  document.getElementById("breakElapsed").innerHTML = 'Elapsed Time: ' + test.displayElapse(elapsed);

  // creates a li element for the elapsed study time 

  var elaps = document.createElement("li"); 

  let elapsedStudyTime = test.displayElapse(elapsed);

  elaps.innerHTML = "Elapsed Study Time: " + elapsedStudyTime;

  document.getElementById("Logs").appendChild(elaps);

   //creates a li element for the total study time 

   var total = document.createElement("li"); 

  studyCount = studyCount + elapsed;

  total.innerHTML = "Total Study Time: " + test.displayElapse(studyCount);

  document.getElementById("Logs").appendChild(total);


  msStart = null;

  }

  

  

} 

startBreak.addEventListener("click", breakTime);


