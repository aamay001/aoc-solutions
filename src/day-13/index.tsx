import RouteLayout from "../components/route-layout";
import { day13Part1Solution, day13Part2Solution } from "./solution";

const Day13 = () => {
  return (
    <RouteLayout 
      name="Day 13"
      problemLink="https://adventofcode.com/2024/day/13"
      dayIndex={13}
      part1Solution={day13Part1Solution}
      part2Solution={day13Part2Solution}
    />
  );
}

export default Day13;