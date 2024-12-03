import RouteLayout from "../components/route-layout";
import { useCheckBox } from "../hooks/use-check-box";
import { useFileInput } from "../hooks/use-file-input";
import { day1Part1Solution, day1Part2Solution } from "./solution";
import {
  noDataMessage,
  dataFileInstructions,
  fileErrorMessage,
} from '../constants/strings';

const Day1 = () => {
  const { FileInput: DataFileInput, fileData } = useFileInput('Input Data', '.txt', 'data', dataFileInstructions);
  const { CheckBox: ShowDataCheckBox, checked: showData } = useCheckBox('Show Data', 'show-data');

  const part1 = day1Part1Solution(fileData) || false;
  const part2 = day1Part2Solution(fileData) || false;

  const errorStyle = {
    color: fileData && !part1 
      ? 'red' 
      : undefined 
  };

  return (
    <RouteLayout 
      name="Day 1"
      problemLink="https://adventofcode.com/2024/day/1"
      dayIndex={1}
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
          {part1}
        </i>
        <strong>Part 2</strong>
        <i style={errorStyle}>
          {!fileData && noDataMessage}
          {fileData && !part2 && fileErrorMessage}
          {part2}
        </i>
      </div>
    </RouteLayout>
  );
}

export default Day1;