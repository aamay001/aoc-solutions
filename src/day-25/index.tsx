import RouteLayout from "../components/route-layout";
import { day25Part1Solution, day25Part2Solution } from "./solution";

const Day25 = () => {
  return (
    <RouteLayout 
      name="Day 25"
      problemLink="https://adventofcode.com/2024/day/25"
      dayIndex={25}
      part1Solution={day25Part1Solution}
      part2Solution={day25Part2Solution}
    />
  );
}

export default Day25;