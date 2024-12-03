import { useParams } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import Day1 from "./day-1";
import Day2 from "./day-2";
import Day3 from './day-3';
import NotFound from "./components/not-found";

const solutionRoutes: (() => JSX.Element)[]  = [
  Day1,
  Day2,
  Day3,
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