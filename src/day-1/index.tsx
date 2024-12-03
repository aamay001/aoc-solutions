import RouteLayout from "../components/route-layout";
import { day1Part1Solution, day1Part2Solution } from "./solution";

const Day1 = () => {
  return (
    <RouteLayout 
      name="Day 1"
      problemLink="https://adventofcode.com/2024/day/1"
      dayIndex={1}
      part1Solution={day1Part1Solution}
      part2Solution={day1Part2Solution}
    />
  );
}

export default Day1;