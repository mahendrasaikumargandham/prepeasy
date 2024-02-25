import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../summary/FileUpload.css'
// import photo from './1.png';
function ResumeUpload() {
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

      const response = await axios.post('/interview', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.status === 200) {
        navigate('/get_details');
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
        <div><img src='https://www.thedigitalgroup.com/products/digital-resume-parser/assets/img/intro-mobile_2.png'/></div>
      <div className='description'>
      <h2>Unlock Your Potential: Empowering Your Career Journey</h2>
      <p>Are you ready to embark on an exciting career journey? Our innovative platform offers a unique blend of technology and human interaction to help you unlock your full potential and achieve your career aspirations.</p>
        <h3>Drop your Resume</h3>
        <input type="file" className='file-input-container' onChange={handleFileChange} />
      <button className='upload-button' onClick={handleUpload}>{load ? 'Loading...' : 'Start'}</button>
      </div>
    </div>
  );
}
export default ResumeUpload