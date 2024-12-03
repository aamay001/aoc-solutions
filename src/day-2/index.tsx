import RouteLayout from "../components/route-layout";
import { useFileInput } from "../hooks/use-file-input";
import { useCheckBox } from "../hooks/use-check-box";
import { day2Part1Solution, day2Part2Solution } from "./solution";
import {
  noDataMessage,
  fileErrorMessage,
  dataFileInstructions,
} from '../constants/strings';

const Day2 = () => {

  const { FileInput: DataFileInput, fileData } = useFileInput('Input Data', '.txt', 'data', dataFileInstructions);
  const { CheckBox: ShowDataCheckBox, checked: showData } = useCheckBox('Show Data', 'show-data');

  const part1 = day2Part1Solution(fileData) || false;
  const part2 = day2Part2Solution(fileData) || false;

  const errorStyle = {
    color: fileData && !part1 
      ? 'red' 
      : undefined 
  };

  return (
    <RouteLayout 
      name="Day 2"
      problemLink="https://adventofcode.com/2024/day/2"
      dayIndex={2}
    >
      {DataFileInput}
      <ShowDataCheckBox />
      {showData &&
        <textarea value={fileData} readOnly />}
        <div className="card">
        <h3>Answer</h3>
        <strong>Part 1</strong>
        <i style={errorStyle}>
          {!fileData && noDataMessage}
          {fileData && !part1 && fileErrorMessage}
          {fileData && part1}
        </i>
        <strong>Part 2</strong>
        <i style={errorStyle}>
          {!fileData && noDataMessage}
          {fileData && !part2 && fileErrorMessage}
          {fileData && part2}
        </i>
      </div>
    </RouteLayout>
  );
}

export default Day2;