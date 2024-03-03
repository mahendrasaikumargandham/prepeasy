import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './FileUpload.css'
import photo from './1.png';
function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [load,setLoad] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      setLoad(true)
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.status === 200) {
        navigate('/summary');
      } else {
        setError('Upload failed');
      }
    } catch (error) {
      setError(error.message);
    }finally{
        setLoad(false)
    }
  };


  return (
    <div className='file-upload-container'>
        <div><img src={photo}/></div>
      <div className='description'>
      <h2>Welcome to our PDF Summarizer!</h2>
      <p>Are you tired of spending hours reading through lengthy PDF documents? Say goodbye to the hassle of manual summarization! Our innovative PDF Summarizer automates the process, saving you valuable time and effort.</p>
        <h3>Drop your file</h3>
        <input type="file" className='file-input-container' onChange={handleFileChange} />
      <button className='upload-button' onClick={handleUpload}>{load ? 'Loading...' : 'Get Summary'}</button>
      </div>
    </div>
  );
}
export default FileUpload