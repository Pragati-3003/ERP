import { Box } from "@mui/material";
import Header from "../../Components/Header";
import ResultChart from "../../Components/Charts/ResultChart";
// import AttendenceChart from "../../Components/Charts/AttendenceChart";
import AttendanceBarChart from "../../Components/Teacher/AttendanceBar/AttendanceBarChart";
const AttendenceB = () => {
  return (
    <Box m="20px">
      <Header title="Attendence Chart" subtitle="Track Your Attendance" />
      <Box height="75vh" overflow={"hidden"}>
        <AttendanceBarChart />
      </Box>
    </Box>
  );
};
export default AttendenceB;
