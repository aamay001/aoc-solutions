import RouteLayout from "../components/route-layout";
import { day8Part1Solution, day8Part2Solution } from "./solution";

const Day8 = () => {
  return (
    <RouteLayout 
      name="Day 8"
      problemLink="https://adventofcode.com/2024/day/8"
      dayIndex={8}
      part1Solution={day8Part1Solution}
      part2Solution={day8Part2Solution}
    />
  );
}

export default Day8;