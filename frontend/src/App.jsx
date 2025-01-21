import { useState } from 'react'
import './App.css'
import './index.css'
import Assignment from './Components/Assignment/Assignment'
import TimeTable from './Components/TimeTable/TimeTable'
import Attendance from './Components/Attendance_student/Attendance'
import CourseEnrolled from './Components/CourseEnrolled/CourseEnrolled'
import CourseAllocated from './Components/Teacher/course_allocated/CourseAllocated'
function App() {

  return (
    <div className='h-auto '>
      {/* <Assignment/> */}
      {/* <TimeTable/> */}
      {/* <Attendance /> */}
      {/* <CourseEnrolled /> */}
      {/*<CourseAllocated/>*/}
      <Login/>
    </div>
  )
}

export default App
