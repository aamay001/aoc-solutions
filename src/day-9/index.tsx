import RouteLayout from "../components/route-layout";
import { day9Part1Solution, day9Part2Solution } from "./solution";

const Day9 = () => {
  return (
    <RouteLayout 
      name="Day 9"
      problemLink="https://adventofcode.com/2024/day/9"
      dayIndex={9}
      part1Solution={day9Part1Solution}
      part2Solution={day9Part2Solution}
    />
  );
}

export default Day9;