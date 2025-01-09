
import { useMemo } from "react";
import { NavLink } from "react-router";

import { appImageAlt } from "../constants/strings";
import appImage from '../assets/app.png';

const days: number[] = [];
for (let i = 0; i < 25; i++) {
  days.push(i+1);
}

const completed: { [key: number]: [boolean, boolean] } = {
  1: [true, true],
  2: [true, true],
  3: [true, true],
  4: [true, true],
  5: [true, true],
  6: [true, false],
  7: [true, true],
  8: [true, true],
  9: [true, true]
};

const Star: React.FC<{ done: boolean }> = ({ done }) => 
  <span className={done ? '' : 'incomplete-star'}>⭐</span>;

const Home = () => {
  return useMemo(() =>
    <>
      <div>
        <img src={appImage} className="app-image" width="100" alt={appImageAlt} />
        <h1>AoC++ 2024 Solutions</h1>
        <a 
          href="https://adventofcode.com/2024" 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ color: 'gold' }}
        >
          <em>Advent of Code</em>
        </a>
      </div>
        <ol>
          {days.map(d => (
            <li key={`day-${d}`} className="nav-day-link">
              <NavLink to={`/day/${d}`}>
                Day {d}&nbsp;
                <Star done={completed[d]?.[0]}/>
                <Star done={completed[d]?.[1]}/>
              </NavLink>
            </li>
          ))}
        </ol>
    </>
  , []);
}

export default Home;