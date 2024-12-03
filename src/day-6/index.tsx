import RouteLayout from "../components/route-layout";
import { day6Part1Solution, day6Part2Solution } from "./solution";

const Day6 = () => {
  return (
    <RouteLayout 
      name="Day 6"
      problemLink="https://adventofcode.com/2024/day/"
      dayIndex={5}
      part1Solution={day6Part1Solution}
      part2Solution={day6Part2Solution}
    />
  );
}

export default Day6;