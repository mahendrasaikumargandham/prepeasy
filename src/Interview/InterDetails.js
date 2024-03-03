// SummaryPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../summary/SummaryPage.css'
function InterDetails() {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get('/get_details');

        if (response.status === 200) {
          setSummary(response.data.summary);
        } else {
          setError('Error fetching summary');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);
  const parsedP = React.createElement("div", { dangerouslySetInnerHTML: { __html: summary } });
  return (
    <div>
      {loading ? (
        <p>Loading summary...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
        <center><h1>Summarized Text</h1></center>
        <p className='summary'>{parsedP}</p>
        <Link className='link' to='/conduct_interview'>Let's Start</Link>
        </>
      )}
    </div>
  );
}
export default InterDetails