import RouteLayout from "../components/route-layout";
import { day17Part1Solution, day17Part2Solution } from "./solution";

const Day17 = () => {
  return (
    <RouteLayout 
      name="Day 17"
      problemLink="https://adventofcode.com/2024/day/17"
      dayIndex={17}
      part1Solution={day17Part1Solution}
      part2Solution={day17Part2Solution}
    />
  );
}

export default Day17;