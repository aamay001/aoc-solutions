import RouteLayout from "../components/route-layout";
import { day22Part1Solution, day22Part2Solution } from "./solution";

const Day22 = () => {
  return (
    <RouteLayout 
      name="Day 22"
      problemLink="https://adventofcode.com/2024/day/22"
      dayIndex={22}
      part1Solution={day22Part1Solution}
      part2Solution={day22Part2Solution}
    />
  );
}

export default Day22;