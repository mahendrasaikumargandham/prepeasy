// SummaryPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../summary/SummaryPage.css'
function FeedBack() {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get('/feedback');

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
  console.log(summary)
  const parsedP = React.createElement("div", { dangerouslySetInnerHTML: { __html: summary } });
  return (
    <div>
      {loading ? (
        <p>Loading summary...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
        <center><h1 style={{paddingTop:'5%'}}>Summarized Text</h1></center>
        <p className='summary'>{parsedP}</p>
        <Link className='link' to='/interview'>Home</Link>
        </>
      )}
    </div>
  );
}
export default FeedBack