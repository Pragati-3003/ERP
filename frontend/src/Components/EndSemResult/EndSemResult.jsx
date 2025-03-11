import React, { useState } from 'react';
import axios from 'axios'
const EndSemResult = () => {
  const [smartCardId, setSmartCardId] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async () => {
    setPdfUrl('');
    if (!smartCardId) {
      setErrorMessage('Please enter your Smart Card ID.');
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Provide Token");
      return;
    }
    try {
      const response = await axios.get("http://localhost:5000/api/user/getEndSemRes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          smartCardId: smartCardId
        },
      });
      if (response) {
        setPdfUrl(response.data.ResultPDF);
        setErrorMessage('');
      } else {
        setPdfUrl('');
        setErrorMessage('Result not available for this ID.');
      }
    } catch (error) {
      console.error('Error fetching result:', error);
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className='container mx-auto p-5'>
      <div>
        <h1 className='text-2xl font-bold mb-6'>Semester Result</h1>
        <div className='filters flex justify-center space-x-4 mb-6'>
          <input
            type='text'
            className='border px-4 py-2 rounded text-white bg-transparent placeholder-gray-500'
            placeholder='Enter Smart Card ID'
            value={smartCardId}
            onChange={(e) => setSmartCardId(e.target.value)}
          />
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <div>
          {pdfUrl ? (
            <div>
              <embed
                src={`http://localhost:5000/${pdfUrl}`}
                type='application/pdf'
                width='100%'
                height='500px'
              />
              <p className='text-green-600 mt-2'>Result found!</p>
            </div>
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <p className='text-gray-500'>Enter your ID and click Search to view the result.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EndSemResult;