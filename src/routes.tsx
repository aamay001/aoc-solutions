import { useParams } from "react-router";
import { ErrorBoundary } from "react-error-boundary";

import NotFound from "./components/not-found";
import Day1 from "./day-1";
import Day2 from "./day-2";
import Day3 from './day-3';
import Day4 from "./day-4";
import Day5 from "./day-5";
import Day6 from "./day-6";
import Day7 from "./day-7";
import Day8 from "./day-8";
import Day9 from "./day-9";
import Day10 from "./day-10";

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
  Day10
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