
  
  export default class Extras {

// function for adding elements to the ul

addLi(msgDisplay){

  var li = document.createElement("li");
  li.innerHTML = msgDisplay;
  document.getElementById("Logs").appendChild(li);

  }


  // function for copying logs 

 copyLogs() {

    const logBox = document.getElementById("Logs");
    const items = logBox.querySelectorAll("li");
    const text = Array.from(items).map(li => li.textContent).join('\n');

    navigator.clipboard.writeText(text)
      .then(() => alert("Copied logs!"))
      .catch(err => console.error("Copy failed", err));

  }

 

  // downloads as .txt file 

  downloadLogs() {

  const logsElement = document.getElementById("Logs");
  const items = logsElement.querySelectorAll("li");

  const text = Array.from(items).map(item => item.textContent).join('\n');

  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "StudyLogs.txt";
  a.click();

  URL.revokeObjectURL(url); // clean up

}

 


// functions to reset flags 

resetAllFlags() {
  startButtonIsClicked = false;
  restartBtn = false;
  breakBtn = false;
  endBtn = false;
}

  }