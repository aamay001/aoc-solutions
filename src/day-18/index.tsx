import RouteLayout from "../components/route-layout";
import { day18Part1Solution, day18Part2Solution } from "./solution";

const Day18 = () => {
  return (
    <RouteLayout 
      name="Day 18"
      problemLink="https://adventofcode.com/2024/day/18"
      dayIndex={18}
      part1Solution={day18Part1Solution}
      part2Solution={day18Part2Solution}
    />
  );
}

export default Day18;