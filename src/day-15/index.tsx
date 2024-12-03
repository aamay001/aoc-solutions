import RouteLayout from "../components/route-layout";
import { day15Part1Solution, day15Part2Solution } from "./solution";

const Day15 = () => {
  return (
    <RouteLayout 
      name="Day 15"
      problemLink="https://adventofcode.com/2024/day/15"
      dayIndex={15}
      part1Solution={day15Part1Solution}
      part2Solution={day15Part2Solution}
    />
  );
}

export default Day15;