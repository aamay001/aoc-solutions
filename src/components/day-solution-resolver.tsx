import { useParams } from "react-router";
import { ErrorBoundary } from "react-error-boundary";

import NotFound from "./not-found";
import Day1 from "../day-1";
import Day2 from "../day-2";
import Day3 from '../day-3';
import Day4 from "../day-4";
import Day5 from "../day-5";
import Day6 from "../day-6";
import Day7 from "../day-7";
import Day8 from "../day-8";
import Day9 from "../day-9";
import Day10 from "../day-10";
import Day11 from "../day-11";
import Day12 from "../day-12";
import Day13 from "../day-13";
import Day14 from "../day-14";
import Day15 from "../day-15";
import Day16 from "../day-16";
import Day17 from "../day-17";
import Day18 from "../day-18";
import Day19 from "../day-19";
import Day20 from "../day-20";
import Day21 from "../day-21";
import Day22 from "../day-22";
import Day23 from "../day-23";
import Day24 from "../day-24";
import Day25 from "../day-25";

const solutionRoutes: (() => JSX.Element)[]  = [
  Day1,
  Day2,
  Day3,
  Day4,
  Day5,
  Day6,
  Day7,
  Day8,
  Day9,
  Day10,
  Day11,
  Day12,
  Day13,
  Day14,
  Day15,
  Day16,
  Day17,
  Day18,
  Day19,
  Day20,
  Day21,
  Day22,
  Day23,
  Day24,
  Day25,
];

export const SolutionForDay: React.FC = () => {
  const params = useParams();
  const day = parseInt(params?.id as string, 10);
  const DaySolution = solutionRoutes[day - 1];
  return (
    <>
      {DaySolution
        ? <ErrorBoundary fallback={<NotFound />}>
            <DaySolution />
          </ErrorBoundary>
        : <NotFound />}
    </>
  );
}