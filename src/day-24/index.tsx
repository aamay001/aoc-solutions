import RouteLayout from "../components/route-layout";
import { day24Part1Solution, day24Part2Solution } from "./solution";

const Day24 = () => {
  return (
    <RouteLayout 
      name="Day 24"
      problemLink="https://adventofcode.com/2024/day/24"
      dayIndex={24}
      part1Solution={day24Part1Solution}
      part2Solution={day24Part2Solution}
    />
  );
}

export default Day24;