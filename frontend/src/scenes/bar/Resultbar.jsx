import { Box } from "@mui/material";
import Header from "../../Components/Header";
import ResultChart from "../../Components/Charts/ResultChart";
const ResultBar = () => {
  return (
    <Box m="20px">
      <Header title="Result Chart" subtitle="Track Your Academic Progress" />
      <Box height="75vh">
        <ResultChart />
      </Box>
    </Box>
  );
};
export default ResultBar;
