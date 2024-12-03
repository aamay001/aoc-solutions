import { useEffect, useState, useMemo } from "react";
import { NavLink } from "react-router";
import CodeEditor from '@uiw/react-textarea-code-editor';

import { useFileInput } from "../hooks/use-file-input";
import { useCheckBox } from "../hooks/use-check-box";
import { getCodeUrl } from '../helpers/get-code-url';
import { appImageAlt } from "../constants/strings";
import {
  noDataMessage,
  dataFileInstructions,
  fileErrorMessage,
} from '../constants/strings';
import appImage from '../assets/app.png';

interface RouteLayoutProps {
  name: string;
  children?: React.ReactNode,
  problemLink?: string,
  dayIndex?: number,
  part1Solution?: (data: string) => number,
  part2Solution?: (data: string) => number
}

const RouteLayout: React.FC<RouteLayoutProps> = ({
  name,
  children,
  problemLink,
  dayIndex,
  part1Solution,
  part2Solution,
}) => {
  const { 
    FileInput: DataFileInput, 
    fileData 
  } = useFileInput('Input Data', '.txt', 'data', dataFileInstructions);
  const { 
    CheckBox: ShowDataCheckBox, 
    checked: showData 
  } = useCheckBox('Show Data', 'show-data');
  const [solutionCode, setSolutionCode] = useState<string | undefined>(undefined);
  const { 
    CheckBox: ShowCodeCheckBox,
    checked: showCode,
  } = useCheckBox('Show Code', 'show-code');
  const codeURL = useMemo(() => getCodeUrl(dayIndex as number), [dayIndex]);

  useEffect(() => {

    const getCode = async () => {
      const res = await fetch(codeURL);
      setSolutionCode(await res.text());
    }

    if (!solutionCode && dayIndex) {
      getCode();
    }

  }, [codeURL, solutionCode, dayIndex]);
  
  const PageNav = () => (
    <div className="page-nav">
      {dayIndex && dayIndex > 1 &&
        <>
          <NavLink to={`/day/${dayIndex - 1}`}>
            Previous Day
          </NavLink>
          &nbsp;•&nbsp;
        </>}

      <NavLink to="/">Go Home</NavLink>

      {dayIndex && dayIndex < 25 &&
        <>
          &nbsp;•&nbsp;
          <NavLink to={`/day/${dayIndex + 1}`}>
            Next Day
          </NavLink>
        </>}
    </div>
  );

  const part1 = useMemo(() => part1Solution?.(fileData) || false, [fileData, part1Solution]);
  const part2 = useMemo(() => part2Solution?.(fileData) || false, [fileData, part2Solution]);

  const errorStyle = {
    color: fileData && !part1 
      ? 'red' 
      : undefined 
  };

  return (
    <>
      <img src={appImage} className="app-image" width="100" alt={appImageAlt} />
      <h1>{name}</h1>
      <em>
        <a href="https://adventofcode.com/2024" rel="noopener noreferrer" target="_blank">
          AoC++ 2024 Solutions
        </a>
      </em>
      <PageNav />
      <hr />
      {problemLink &&
        <NavLink to={problemLink} target="_blank">Puzzle Description</NavLink>}
      {problemLink && <h2>Solution</h2>}

      {problemLink && DataFileInput}
      {problemLink && <ShowDataCheckBox />}
      {showData &&
        <textarea value={fileData} readOnly />}

      {part1Solution && part2Solution &&
        <div className="card">
          <h3>Answer</h3>
          <strong>Part 1</strong>
          <i style={errorStyle}>
            {!fileData && noDataMessage}
            {fileData && !part1 && fileErrorMessage}
            {part1}
          </i>
          <strong>Part 2</strong>
          <i style={errorStyle}>
            {!fileData && noDataMessage}
            {fileData && !part2 && fileErrorMessage}
            {part2}
          </i>
        </div>
      }

      {children}

      {problemLink && <ShowCodeCheckBox />}
      {solutionCode && showCode &&
        <>
          <div 
            style={{ 
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column', 
              alignItems: 'center',
            }}
          >
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
            <a 
              href={codeURL}
              rel="noopener noreferrer" 
              target="_blank" 
              style={{ fontSize: 12 }}
            >
              {codeURL}
            </a>
          </div>
        </>}
      <hr />
      <PageNav />
    </>
  );
}

export default RouteLayout;