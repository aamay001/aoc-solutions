import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import CodeEditor from '@uiw/react-textarea-code-editor';

import { useCheckBox } from "../hooks/use-check-box";
import { getCodeUrl } from '../helpers/get-code-url';
import appImage from '../assets/app.jpg';
import { appImageAlt } from "../constants/strings";

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
  const [solutionCode, setSolutionCode] = useState<string | undefined>(undefined);
  const { 
    CheckBox: ShowCodeCheckBox,
    checked: showCode,
  } = useCheckBox('Show Code', 'show-code');

  useEffect(() => {

    const getCode = async () => {
      const res = await fetch(getCodeUrl(dayIndex as number));
      setSolutionCode(await res.text());
    }

    if (!solutionCode && dayIndex) {
      getCode();
    }
    
  }, [dayIndex, solutionCode]);
  
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
      <img src={appImage} width="100" alt={appImageAlt} />
      <h1>{name}</h1>
      <em>
        <a href="https://adventofcode.com/2024" rel="noopener noreferrer">
          AoC++ 2024 Solutions
        </a>
      </em>
      <PageNav />
      <hr />
      {problemLink &&
        <NavLink to={problemLink}>Puzzle Description</NavLink>}
      {problemLink && <h2>Solution</h2>}
      {children}
      {problemLink && <ShowCodeCheckBox />}
      {solutionCode && showCode &&
        <>
          <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', }}>
            <CodeEditor 
              readOnly
              placeholder="Fetching code from GitHub"
              value={solutionCode} 
              language="typescript"
              style={{ 
                maxHeight: 400,
                padding: 10,
                border: '1px solid #646cff',
                overflow:'scroll',
                marginBottom: 10,
              }} 
            />
            <a href={getCodeUrl(dayIndex as number)} rel="noopener noreferrer" target="_blank" style={{ fontSize: 12 }}>
              {getCodeUrl(dayIndex as number)}
            </a>
          </div>
        </>}
      <hr />
      <PageNav />
    </>
  );
}

export default RouteLayout;