import React, { useState } from "react";
import "./CSS/Interview.css";

function Summary() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  return (
    <div className="interview">
      <div className="interview__content">
        <div className="resume__upload">
          <input type="file" onChange={handleFileChange} accept=".pdf" />
        </div>
        <div className="start__interview">
          {selectedFile && (
            <button onClick={() => alert("File uploaded!")}>
              Start Interview
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Summary;
