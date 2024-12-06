import RouteLayout from "../components/route-layout";
import { day19Part1Solution, day19Part2Solution } from "./solution";

const Day19 = () => {
  return (
    <RouteLayout 
      name="Day 19"
      problemLink="https://adventofcode.com/2024/day/19"
      dayIndex={19}
      part1Solution={day19Part1Solution}
      part2Solution={day19Part2Solution}
    />
  );
}

export default Day19;