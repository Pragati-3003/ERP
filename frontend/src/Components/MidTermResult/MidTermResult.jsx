// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import { useSelector } from "react-redux";

// const MidTermResult = () => {
//     const [results, setResults] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');

//     const StudentSmartID = useSelector((state) => state.auth.user.userInfo.smartID);
//     const CurriculumID = useSelector((state) => state.auth.user.userInfo.CurriculumID);
//     const semester = useSelector((state) => state.auth.user.userInfo.Semester);

//     const fetchResults = async () => {
//         setLoading(true);
//         setError('');
//         const token = localStorage.getItem("token");
//         if (!token) {
//             console.log("Provide Token");
//             return;
//         }
//         try {
//             const response = await axios.get(`http://localhost:5000/api/student/getMidtermResults`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//                 params: { StudentSmartID, CurriculumID, semester }
//             });

//             setResults(response.data.midtermResults);
//         } catch (err) {
//             setError(err.response ? err.response.data.message : 'Something went wrong');
//             setResults([]);
//         } finally {
//             setLoading(false);
//         }
//     };
//     useEffect(() => { fetchResults() }, [])

//     return (
//         <div className="attendance-report-container  w-full p-8 min-h-max flex flex-col items-center">
//             {/* Header Section */}
//             <div className="header bg-blue-600 max-w-6xl  w-full  text-white px-6 py-4  rounded-lg shadow-md  flex justify-between items-center">
//                 <div className='w-fit pl-1.5 '>
//                     <h1 className="text-2xl  font-bold">Mid Term Result Report</h1>
//                     <p className="text-sm mt-1">
//                         Semester {semester}
//                     </p>
//                 </div>
//             </div>

//             {/* Table Section */}
//             <div className="table-container mt-8 w-full max-w-6xl overflow-x-auto">
//             <table className="w-full border-collapse bg-white rounded-lg shadow-md overflow-hidden table-fixed">
//                     <thead className="bg-blue-100">
//                         <tr>
//                             <th className="text-left px-6 py-3 text-blue-900 font-semibold">
//                                 Teacher Name
//                             </th>
//                             <th className="text-left px-6 py-3 text-blue-900 font-semibold">
//                                 Course Name
//                             </th>
//                             <th className="text-left px-6 py-3 text-blue-900 font-semibold">
//                                 Periodical 1
//                             </th>
//                             <th className="text-left px-6 py-3 text-blue-900 font-semibold">
//                                 Periodical 2
//                             </th>
//                             <th className="text-left px-6 py-3 text-blue-900 font-semibold">
//                                 Assignment 1
//                             </th>
//                             <th className="text-left px-6 py-3 text-blue-900 font-semibold">
//                                 Assignment 1
//                             </th>
//                             <th className="text-left px-6 py-3 text-blue-900 font-semibold">
//                                 Internals
//                             </th>
//                             <th className="text-left px-6 py-3 text-blue-900 font-semibold">
//                                 Remarks
//                             </th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {results.map((result, index) => {
//                             return (
//                                 <tr
//                                     key={index}
//                                     className={`${index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
//                                         } text-gray-800`}
//                                 >
//                                     <td className="px-6 py-3">{result.teacherName}</td>
//                                     <td className="px-6 py-3">{result.courseCode + " " + result.courseName}</td>
//                                     <td className="px-6 py-3">{result.periodical1}</td>
//                                     <td className="px-6 py-3">{result.assignment1}</td>
//                                     <td className="px-6 py-3">{result.periodical2}</td>
//                                     <td className="px-6 py-3">{result.assignment2}</td>
//                                     <td className="px-6 py-3">{result.internals}</td>
//                                     <td className="px-6 py-3">{result.remarks}</td>
//                                 </tr>
//                             );
//                         })}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Footer Section */}
//             <div className="footer mt-8 text-gray-600 text-sm">
//                 <p>
//                     Ensure your attendance percentage meets the minimum requirement of 70%
//                     for each subject.
//                 </p>
//             </div>
//         </div>
//     );
// }

// export default MidTermResult
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const MidTermResult = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const StudentSmartID = useSelector(
    (state) => state.auth.user.userInfo.smartID
  );
  const CurriculumID = useSelector(
    (state) => state.auth.user.userInfo.CurriculumID
  );
  const semester = useSelector((state) => state.auth.user.userInfo.Semester);

  const fetchResults = async () => {
    setLoading(true);
    setError("");
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Provide Token");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:5000/api/student/getMidtermResults`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { StudentSmartID, CurriculumID, semester },
        }
      );

      setResults(response.data.midtermResults);
    } catch (err) {
      setError(
        err.response ? err.response.data.message : "Something went wrong"
      );
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <div className="attendance-report-container w-full p-8 min-h-max flex flex-col items-center">
      {/* Header Section */}
      <div className="header bg-blue-600 max-w-6xl w-full text-white px-6 py-4 rounded-lg shadow-md flex justify-between items-center">
        <div className="w-fit pl-1.5 ">
          <h1 className="text-2xl font-bold">Mid Term Result Report</h1>
          <p className="text-sm mt-1">Semester {semester}</p>
        </div>
      </div>

      {/* Table Section */}
      <div className="table-container mt-8 w-full max-w-6xl overflow-x-auto">
        {loading && <p className="text-blue-600 mt-4">Loading results...</p>}
        {error && <p className="text-red-600 mt-4">{error}</p>}
        {!loading && !error && results.length === 0 && (
          <p className="text-gray-500 mt-4">No midterm results found.</p>
        )}

        {!loading && results.length > 0 && (
          <table className="w-full border-collapse bg-white rounded-lg shadow-md overflow-hidden table-fixed">
            <thead className="bg-blue-100">
              <tr>
                <th className="text-left px-6 py-3 text-blue-900 font-semibold">
                  Teacher Name
                </th>
                <th className="text-left px-6 py-3 text-blue-900 font-semibold">
                  Course Name
                </th>
                <th className="text-left px-6 py-3 text-blue-900 font-semibold">
                  Periodical 1
                </th>
                <th className="text-left px-6 py-3 text-blue-900 font-semibold">
                  Periodical 2
                </th>
                <th className="text-left px-6 py-3 text-blue-900 font-semibold">
                  Assignment 1
                </th>
                <th className="text-left px-6 py-3 text-blue-900 font-semibold">
                  Assignment 2
                </th>{" "}
                {/* Fixed */}
                <th className="text-left px-6 py-3 text-blue-900 font-semibold">
                  Internals
                </th>
                <th className="text-left px-6 py-3 text-blue-900 font-semibold">
                  Remarks
                </th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                  } text-gray-800`}
                >
                  <td className="px-6 py-3">{result.teacherName}</td>
                  <td className="px-6 py-3">
                    {result.courseCode + " " + result.courseName}
                  </td>
                  <td className="px-6 py-3">{result.periodical1}</td>
                  <td className="px-6 py-3">{result.periodical2}</td>{" "}
                  {/* Fixed incorrect mapping */}
                  <td className="px-6 py-3">{result.assignment1}</td>
                  <td className="px-6 py-3">{result.assignment2}</td>{" "}
                  {/* Fixed incorrect mapping */}
                  <td className="px-6 py-3">{result.internals}</td>
                  <td className="px-6 py-3">{result.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer Section */}
      <div className="footer mt-8 text-gray-600 text-sm">
        <p>
          Ensure your attendance percentage meets the minimum requirement of 70%
          for each subject.
        </p>
      </div>
    </div>
  );
};

export default MidTermResult;
