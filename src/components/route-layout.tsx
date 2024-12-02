import { NavLink } from "react-router";

interface RouteLayoutProps {
  name: string;
  children?: React.ReactNode,
  problemLink?: string,
  dayIndex?: number,
}

const RouteLayout: React.FC<RouteLayoutProps> = ({
  name,
  children,
  problemLink,
  dayIndex,
}) => {

  const PageNav = () => (
    <div className="page-nav">
      {dayIndex && dayIndex > 1 &&
        <>
          <NavLink to={`/day-${dayIndex - 1}`}>
            Previous Day
          </NavLink>
          &nbsp;•&nbsp;
        </>}

      <NavLink to="/">Go Home</NavLink>

      {dayIndex && dayIndex < 25 &&
        <>
          &nbsp;•&nbsp;
          <NavLink to={`/day-${dayIndex + 1}`}>
            Next Day
          </NavLink>
        </>}
    </div>
  );

  return (
    <>
      <h1>{name}</h1>
      <em>
        <a href="https://adventofcode.com/2024" rel="noopener noreferrer">
          AoC++ 2024
        </a>
      </em>
      <PageNav />
      <hr />
      {problemLink &&
        <NavLink to={problemLink}>Puzzle Description</NavLink>}
      {problemLink && <h2>Solution</h2>}
      {children}
      <hr />
      <PageNav />
    </>
  );
}

export default RouteLayout;