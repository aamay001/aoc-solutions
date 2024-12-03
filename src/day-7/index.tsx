import RouteLayout from "../components/route-layout";
import { day7Part1Solution, day7Part2Solution } from "./solution";

const Day7 = () => {
  return (
    <RouteLayout 
      name="Day 7"
      problemLink="https://adventofcode.com/2024/day/7"
      dayIndex={5}
      part1Solution={day7Part1Solution}
      part2Solution={day7Part2Solution}
    />
  );
}

export default Day7;