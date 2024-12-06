import RouteLayout from "../components/route-layout";
import { day20Part1Solution, day20Part2Solution } from "./solution";

const Day20 = () => {
  return (
    <RouteLayout 
      name="Day 20"
      problemLink="https://adventofcode.com/2024/day/20"
      dayIndex={20}
      part1Solution={day20Part1Solution}
      part2Solution={day20Part2Solution}
    />
  );
}

export default Day20;