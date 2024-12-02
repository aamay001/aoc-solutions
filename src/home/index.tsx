import { NavLink } from "react-router";

const days: number[] = [];
for (let i = 0; i < 25; i++) {
  days.push(i+1);
}

const Home = () => {
  return (
    <>
      <div>
        <h1>Advent of Code</h1>
        <a href="https://adventofcode.com/2024" target="_blank" rel="noopener noreferrer" style={{ color: 'gold' }}>
          <em>Solutions for 2024</em>
        </a>
      </div>
        <ol>
          {days.map(d => (
            <li key={`day-${d}`}>
              <NavLink to={`/day-${d}`}>Day {d}</NavLink>
            </li>
          ))}
        </ol>
    </>
  );
}

export default Home;