import RouteLayout from "../components/route-layout";
import { day23Part1Solution, day23Part2Solution } from "./solution";

const Day23 = () => {
  return (
    <RouteLayout 
      name="Day 23"
      problemLink="https://adventofcode.com/2024/day/23"
      dayIndex={23}
      part1Solution={day23Part1Solution}
      part2Solution={day23Part2Solution}
    />
  );
}

export default Day23;