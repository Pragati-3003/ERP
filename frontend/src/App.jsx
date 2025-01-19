import { useState } from 'react'
import './App.css'
import './index.css'
import Assignment from './Components/Assignment/Assignment'
import TimeTable from './Components/TimeTable/TimeTable'
import Attendance from './Components/Attendance_student/Attendance'
import CourseEnrolled from './Components/CourseEnrolled/CourseEnrolled'
function App() {

  return (
    <div className='h-auto '>
      {/* <Assignment/> */}
      {/* <TimeTable/> */}
      {/* <Attendance /> */}
      <CourseEnrolled />
    </div>
  )
}

export default App
