import RouteLayout from "../components/route-layout";
import { day2Part1Solution, day2Part2Solution } from "./solution";

const Day2 = () => {
  return (
    <RouteLayout 
      name="Day 2"
      problemLink="https://adventofcode.com/2024/day/2"
      dayIndex={2}
      part1Solution={day2Part1Solution}
      part2Solution={day2Part2Solution}
    />
  );
}

export default Day2;