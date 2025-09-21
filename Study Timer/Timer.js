export default class Timer{

    constructor() { // constructor to set the variables to null 

        this.startTime = null;
        this.endTime = null;

        this.bTime = null;

     }


     // will only use this instead of having a start and stop functions 
     time(d){

        
        //let hour = d.getHours();
        //let minutes = d.getMinutes();
        //let starting = Date.now(); // intializes the variable with the current time in ms

        //const d = new Date.now(); 

        //const d = new Date(); 


        // converting the time from 24 hours to regular time 
        let Hrs = d.getHours(); 
        let Mins = d.getMinutes(); 

         const ampm = Hrs >= 12 ? 'PM' : 'AM';
            Hrs = Hrs % 12 || 12;
            Mins = Mins < 10 ? '0' + Mins : Mins;

         
        
             return `${Hrs}:${Mins} ${ampm}`;

     }

     timeStopped(){

        
        const d = new Date(); 


        // converting the time from 24 hours to regular time 
        let Hrs = d.getHours(); 
        let Mins = d.getMinutes(); 

         const ampm = Hrs >= 12 ? 'PM' : 'AM';
            Hrs = Hrs % 12 || 12;
            Mins = Mins < 10 ? '0' + Mins : Mins;

         
        
             return `${Hrs}:${Mins} ${ampm}`;

     }

    set setStart(newStart) {

      this.startTime = newStart;

      

     }

     getStart() {


     }

    setBreak(time){

        this.bTime = time; 

        


     }

     getBreak() {

        return this.bTime; 


     }

     displayElapse(currElapsed){ // returns the time elasped in ms 

      //this.startTime = start;
      //this.endTime = end; 
        
      let elapsed = currElapsed; // time is in ms 

      let  secElapsed; // convert from ms to sec 

      let minElapsed; 

      let hrsElapsed; 

      let seconds;

     if(elapsed < 1000){

      return `${elapsed} ms`;

     } else if(elapsed >= 1000 && elapsed < 60000 ) { // display time in seconds

      elapsed = Math.floor(elapsed/1000);

      return elapsed + " second(s)";

     } else if (elapsed >= 60000 && elapsed < 3600000) { // display time in minutes, and seconds 

      let  convSec = Math.floor(elapsed/1000); // convert from ms to sec 

      let minElapsed = Math.floor(convSec/60); 

      secElapsed = convSec - minElapsed * 60; // displays the secElapsed 

      return minElapsed + " min " + secElapsed + " sec";


     } else if(elapsed >= 3600000 && elapsed < 86400000) {

         secElapsed = Math.floor(elapsed/1000); // convert from ms to sec 

         seconds = secElapsed % 60; 
         //minElapsed = Math.floor((secElapsed % 3600) / 60); // convert from seconds to min 
         minElapsed = Math.floor(secElapsed/ 60); // holds number of total min elapsed 

         let minutes = minElapsed % 60; // holds the num of minutes elapsed 

         hrsElapsed = Math.floor(minElapsed/60); // hold num of hrs elapsed 

        // secElapsed = secElapsed - hrsElapsed * 36000; 

         
         
         return hrsElapsed + " hr(s) " + minutes + " min " + seconds+ " sec";
     
     } else if(elapsed >= 86400000){


         secElapsed = Math.floor(elapsed/1000); // convert from ms to sec 

         seconds = secElapsed % 60; 
         //minElapsed = Math.floor((secElapsed % 3600) / 60); // convert from seconds to min 
         minElapsed = Math.floor(secElapsed/ 60); // holds number of total min elapsed 

         let minutes = minElapsed % 60; // holds the num of minutes elapsed 

         hrsElapsed = Math.floor(minElapsed/60); // hold the total num of hrs elapsed 
         let hours = hrsElapsed % 24;

         let daysElapsed = Math.floor(hrsElapsed / 24); 

        // secElapsed = secElapsed - hrsElapsed * 36000; 

         return daysElapsed + " day(s)" + hours + " hr(s) " + minutes + " min(s) " + seconds+ " sec(s)";

     }

     /*
     elaspedTime(){


     }

     setManualTime(){}

     getStartTime(){


     }

     getEndTime(){}

     

     displayElapse(){


     
     }



     
*/
   }

  }

  //UNCOMMENT WHEN TESTING WITH NODE.JS
  //module.exports = Timer; 