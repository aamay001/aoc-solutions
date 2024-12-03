import RouteLayout from "../components/route-layout";
import { day16Part1Solution, day16Part2Solution } from "./solution";

const Day16 = () => {
  return (
    <RouteLayout 
      name="Day 16"
      problemLink="https://adventofcode.com/2024/day/16"
      dayIndex={16}
      part1Solution={day16Part1Solution}
      part2Solution={day16Part2Solution}
    />
  );
}

export default Day16;