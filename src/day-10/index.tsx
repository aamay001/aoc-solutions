import RouteLayout from "../components/route-layout";
import { day10Part1Solution, day10Part2Solution } from "./solution";

const Day10 = () => {
  return (
    <RouteLayout 
      name="Day 10"
      problemLink="https://adventofcode.com/2024/day/10"
      dayIndex={10}
      part1Solution={day10Part1Solution}
      part2Solution={day10Part2Solution}
    />
  );
}

export default Day10;