import RouteLayout from "../components/route-layout";
import { day5Part1Solution, day5Part2Solution } from "./solution";

const Day5 = () => {
  return (
    <RouteLayout 
      name="Day 5"
      problemLink="https://adventofcode.com/2024/day/5"
      dayIndex={5}
      part1Solution={day5Part1Solution}
      part2Solution={day5Part2Solution}
    />
  );
}

export default Day5;