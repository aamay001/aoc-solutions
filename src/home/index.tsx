import { NavLink } from "react-router";

import appImage from '../assets/app.jpg';
import { appImageAlt } from "../constants/strings";

const days: number[] = [];
for (let i = 0; i < 25; i++) {
  days.push(i+1);
}

const completed: { [key: number]: boolean } = {
  1: true,
  2: true,
};

const Home = () => {
  return (
    <>
      <div>
        <img src={appImage} className="app-image" width="100" alt={appImageAlt} />
        <h1>AoC++ 2024 Solutions</h1>
        <a href="https://adventofcode.com/2024" target="_blank" rel="noopener noreferrer" style={{ color: 'gold' }}>
          <em>Advent of Code</em>
        </a>
      </div>
        <ol>
          {days.map(d => (
            <li key={`day-${d}`} className="nav-day-link">
              <NavLink to={`/day-${d}`}>Day {d}&nbsp;{completed[d] ? '⭐⭐' : ''}</NavLink>
            </li>
          ))}
        </ol>
    </>
  );
}

export default Home;