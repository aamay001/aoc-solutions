import RouteLayout from "../components/route-layout";
import { day3Part1Solution, day3Part2Solution } from "./solution";

const Day3 = () => {
  return (
    <RouteLayout 
      name="Day 3"
      problemLink="https://adventofcode.com/2024/day/3"
      dayIndex={3}
      part1Solution={day3Part1Solution}
      part2Solution={day3Part2Solution}
    />
  );
}

export default Day3;