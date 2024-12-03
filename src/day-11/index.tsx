import RouteLayout from "../components/route-layout";
import { day11Part1Solution, day11Part2Solution } from "./solution";

const Day11 = () => {
  return (
    <RouteLayout 
      name="Day 11"
      problemLink="https://adventofcode.com/2024/day/11"
      dayIndex={11}
      part1Solution={day11Part1Solution}
      part2Solution={day11Part2Solution}
    />
  );
}

export default Day11;