import RouteLayout from "../components/route-layout";
import { day12Part1Solution, day12Part2Solution } from "./solution";

const Day12 = () => {
  return (
    <RouteLayout 
      name="Day 12"
      problemLink="https://adventofcode.com/2024/day/12"
      dayIndex={12}
      part1Solution={day12Part1Solution}
      part2Solution={day12Part2Solution}
    />
  );
}

export default Day12;