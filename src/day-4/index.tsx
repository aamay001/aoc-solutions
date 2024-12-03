import RouteLayout from "../components/route-layout";
import { day4Part1Solution, day4Part2Solution } from "./solution";

const Day4 = () => {
  return (
    <RouteLayout 
      name="Day 4"
      problemLink="https://adventofcode.com/2024/day/4"
      dayIndex={4}
      part1Solution={day4Part1Solution}
      part2Solution={day4Part2Solution}
    />
  );
}

export default Day4;