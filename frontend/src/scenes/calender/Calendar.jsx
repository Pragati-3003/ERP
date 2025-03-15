// import { useState } from "react";
// // import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import listPlugin from "@fullcalendar/list";
// import {
//   Box,
//   List,
//   ListItem,
//   ListItemText,
//   Typography,
//   useTheme,
// } from "@mui/material";
// import Header from "../../Components/Header";
// import { tokens } from "../theme";

// const Calendar = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const [currentEvents, setCurrentEvents] = useState([]);

//   useEffect(() => {
//     console.log("Current events updated:", currentEvents);
//   }, [currentEvents]);

//   const handleDateClick = (selected) => {
//     const title = prompt("Please enter a new title for your event");
//     const calendarApi = selected.view.calendar;
//     calendarApi.unselect();

//     if (title) {
//       const newEvent = {
//         id: `${selected.dateStr}-${title}`,
//         title,
//         start: selected.startStr,
//         end: selected.endStr,
//         allDay: selected.allDay,
//       };
//       calendarApi.addEvent(newEvent);
//       setCurrentEvents((prevEvents) => [...prevEvents, newEvent]);
//     }
//   };

//   const handleEventClick = (selected) => {
//     if (
//       window.confirm(
//         `Are you sure you want to delete the event '${selected.event.title}'`
//       )
//     ) {
//       selected.event.remove();
//       setCurrentEvents((prevEvents) =>
//         prevEvents.filter((event) => event.id !== selected.event.id)
//       );
//     }
//   };

//   return (
//     <Box m="20px">
//       <Header title="Calendar" subtitle="Full Calendar Interactive Page" />

//       <Box display="flex" justifyContent="space-between">
//         {/* CALENDAR SIDEBAR */}
//         <Box
//           flex="1 1 20%"
//           backgroundColor={colors.primary[400]}
//           p="15px"
//           borderRadius="4px"
//         >
//           <Typography variant="h5">Events</Typography>
//           <List>
//             {currentEvents.map((event) => (
//               <ListItem
//                 key={event.id}
//                 sx={{
//                   backgroundColor: colors.greenAccent[400],
//                   margin: "10px 0",
//                   borderRadius: "2px",
//                 }}
//               >
//                 <ListItemText
//                   primary={event.title}
//                   secondary={
//                     <Typography>
//                       {formatDate(event.start, {
//                         year: "numeric",
//                         month: "short",
//                         day: "numeric",
//                       })}
//                     </Typography>
//                   }
//                 />
//               </ListItem>
//             ))}
//           </List>
//         </Box>

//         {/* CALENDAR */}
//         <Box flex="1 1 100%" ml="15px">
//           {/* <FullCalendar
//             height="75vh"
//             plugins={[
//               dayGridPlugin,
//               timeGridPlugin,
//               interactionPlugin,
//               listPlugin,
//             ]}
//             headerToolbar={{
//               left: "prev,next today",
//               center: "title",
//               right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
//             }}
//             initialView="dayGridMonth"
//             editable={true}
//             selectable={true}
//             selectMirror={true}
//             dayMaxEvents={true}
//             select={handleDateClick}
//             eventClick={handleEventClick}
//             eventsSet={(events) => {
//               console.log("Events set:", events);
//               setCurrentEvents(events);
//             }}
//             initialEvents={[
//               {
//                 id: "1",
//                 title: "Test Event",
//                 start: new Date().toISOString(),
//               },
//             ]}
//           /> */}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Calendar;
import React, { useState } from "react";
import "tailwindcss/tailwind.css";

const months = [
  "July 2024",
  "August 2024",
  "September 2024",
  "October 2024",
  "November 2024",
  "December 2024",
  "January 2025",
  "February 2025",
  "March 2025",
  "April 2025",
  "May 2025",
  "June 2025",
  "July 2025",
];

const events = {
  teaching: "bg-green-500",
  periodicalExam: "bg-blue-500",
  semesterExam: "bg-purple-500",
  holidays: "bg-yellow-400",
  weekends: "bg-pink-400",
};

const holidays = {
  January: { date: 26, name: "Republic Day" },
  March: { date: 8, name: "Holi" },
  April: { date: 14, name: "Good Friday" },
  May: { range: [6, 31], name: "Summer Break" },
  June: { range: [1, 30], name: "Summer Break" },
  July: { range: [1, 10], name: "Summer Break" },
  August: { date: 15, name: "Independence Day" },
  September: { date: 19, name: "Ganesh Chaturthi" },

  November: { date: 12, name: "Diwali" },
  December: { date: 25, name: "Christmas" },
};

const exams = {
  September: { periodical1: [4, 5, 6, 7] },
  October: { periodical2: [23, 24, 25, 26] },
  December: {
    semester: [7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 19, 20, 21, 22, 23],
  },
};

const getDaysInMonth = (monthIndex, year = 2024) => {
  return new Date(year, monthIndex + 1, 0).getDate();
};

const getStartDay = (monthIndex, year = 2024) => {
  let startDay = new Date(year, monthIndex, 1).getDay();
  return (startDay - 2 + 7) % 7; // Adjust so that Tuesday is the first day
};

const Calendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const monthIndex = months.indexOf(selectedMonth);
  const daysInMonth = getDaysInMonth(monthIndex);
  const startDay = getStartDay(monthIndex);
  const monthName = selectedMonth.split(" ")[0]; // Extracts "March" from "March 2025"

  return (
    <div className="p-5 min-h-screen text-aqua-800 dark:text-white  flex flex-col items-center overflow-hiddenhidden">
      <h1 className="text-4xl font-bold text-center mb-5">Academic Calendar</h1>

      <div className="mb-5">
        <select
          className="p-3 border rounded shadow-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      <div className="border p-5 rounded-lg shadow-lg max-w-3xl mx-auto bg-blue dark:bg-gray-800 text-aqua-800 dark:text-white  w-full">
        <h2 className="text-2xl font-semibold text-center mb-3">
          {selectedMonth}
        </h2>
        <div className="grid grid-cols-7 gap-1 text-center font-bold ">
          {["Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"].map((day) => (
            <div
              key={day}
              className="p-2 bg-gray-500 dark:bg-blue-400 rounded-lg  text-aqua-800"
            >
              {day}
            </div>
          ))}
          {Array(startDay)
            .fill(null)
            .map((_, index) => (
              <div key={`empty-${index}`} className="h-10"></div>
            ))}
          {[...Array(daysInMonth)].map((_, day) => {
            let eventClass = events.teaching;
            const dayNumber = day + 1;
            const dayOfWeek = (day + startDay) % 7;
            const isWeekend = dayOfWeek === 0;
            const isHoliday =
              holidays[monthName] &&
              (holidays[monthName].date === dayNumber ||
                (holidays[monthName].range &&
                  holidays[monthName].range[0] <= dayNumber &&
                  holidays[monthName].range[1] >= dayNumber));
            const isperiodicalExam =
              exams[monthName] &&
              (exams[monthName].periodical1?.includes(dayNumber) ||
                exams[monthName].periodical2?.includes(dayNumber) ||
                exams[monthName].semester?.includes(dayNumber));
            const issemExam =
              exams[monthName] &&
              exams[monthName].semester?.includes(dayNumber);
            let holidayName = isHoliday ? holidays[monthName].name : "";

            if (isHoliday) {
              eventClass = events.holidays;
            } else if (isperiodicalExam) {
              eventClass = events.periodicalExam;
            } else if (isWeekend) {
              eventClass = events.weekends;
            }
            if (issemExam) {
              eventClass = events.semesterExam;
            }
            return (
              <div
                key={day}
                className={`h-14 w-16 ml-3 flex items-center justify-center align-middle rounded-lg font-bold shadow-md text-white ${eventClass}`}
                title={holidayName}
              >
                {dayNumber}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
        {Object.entries(events).map(([key, color]) => (
          <div key={key} className="flex items-center gap-2">
            <span className={`h-4 w-4 ${color} block rounded-full`}></span>
            <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
