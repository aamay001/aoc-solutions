import RouteLayout from "../components/route-layout";
import { day14Part1Solution, day14Part2Solution } from "./solution";

const Day14 = () => {
  return (
    <RouteLayout 
      name="Day 14"
      problemLink="https://adventofcode.com/2024/day/14"
      dayIndex={14}
      part1Solution={day14Part1Solution}
      part2Solution={day14Part2Solution}
    />
  );
}

export default Day14;