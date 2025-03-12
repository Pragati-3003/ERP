import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import axios from 'axios';
const TimeTable = () => {
    const curriculumID = useSelector((state) => state.auth.user.userInfo.CurriculumID);
    const semester = useSelector((state) => state.auth.user.userInfo.Semester);
    const [timetable, settimetable] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                console.log("Provide Token");
                return;
            }
            try {
                const response = await axios.get("http://localhost:5000/api/student/getTimeTable", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        curriculumID,
                        semester,
                    },
                });
                // console.log(response.data.pdfURL);
                settimetable(response.data.pdfURL)
                // setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                // setError("Failed to fetch attendance data. Please try again.");
                // setLoading(false);
            }
        }
        fetchData();
    }, [])
    return (
        <div className='container mx-auto  p-5 '>
            <div >
                <div>
                    <h1 className='text-2xl font-bold mb-6'>
                        University TimeTables</h1>
                </div>
                <div>
                    {timetable ? (
                        <div>
                            <embed
                                src={`http://localhost:5000/${timetable}`}
                                type="application/pdf"
                                width="100%"
                                height="600px"
                            />

                            <p className="mt-2 text-green-600">Timetable found!</p>
                            <a
                                href={`http://localhost:5000/${timetable}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                            >
                                Open in New Tab
                            </a>
                        </div>
                    ) : (
                        <p className="text-gray-500">Please select a course and semester to view the timetable.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TimeTable