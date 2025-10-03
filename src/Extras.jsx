import React, { useState } from 'react';
import './ButtonStyle.css';


// POPUP MESSAGES

// timer already started 

// break already started 

// session is saved 



/*
export default function Extras({ logs }) {

  const [copied, setCopied] = useState(false);

  function copyLogs() {

    const copyText = logs.join('\n'); // joins logs with line breaks


    // function that takes in the copyText variable contents, and writes it to the clipboard 

    navigator.clipboard.writeText(copyText)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => console.error("Failed to copy: ", err));
  }

  function downloadLogs() {

    const downloadText = logs.join('\n');

  const blob = new Blob([downloadText], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;
  a.download = "StudyLogs.txt";
  a.click();

  URL.revokeObjectURL(url); // clean up



}

  return (

    <div className="copy-download" >


    <div className="copy-container">


      <span className="copy-text" onClick={copyLogs}>
        Copy
      </span>

      {copied && <span className="copied-msg">Copied!</span>} 


    </div>

<div className="download-container">


      <span className="download-text" onClick={downloadLogs}>
        Download
      </span>

      


    </div>


</div>
    

  );
}
*/