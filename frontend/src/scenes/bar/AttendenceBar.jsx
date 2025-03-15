import { Box } from "@mui/material";
import Header from "../../Components/Header";
import ResultChart from "../../Components/Charts/ResultChart";
import AttendenceChart from "../../Components/Charts/AttendenceChart";
const AttendenceBar = () => {
  return (
    <Box m="20px">
      <Header title="Attendence Chart" subtitle="Track Your Attendance" />
      <Box height="75vh" overflow={"hidden"}>
        <AttendenceChart />
      </Box>
    </Box>
  );
};
export default AttendenceBar;
