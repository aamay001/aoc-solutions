import RouteLayout from "../components/route-layout";
import { day21Part1Solution, day21Part2Solution } from "./solution";

const Day21 = () => {
  return (
    <RouteLayout 
      name="Day 21"
      problemLink="https://adventofcode.com/2024/day/21"
      dayIndex={21}
      part1Solution={day21Part1Solution}
      part2Solution={day21Part2Solution}
    />
  );
}

export default Day21;