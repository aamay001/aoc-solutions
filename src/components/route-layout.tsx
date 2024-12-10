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
  calculating,
} from '../constants/strings';
import appImage from '../assets/app.png';

interface RouteLayoutProps {
  name: string;
  children?: React.ReactNode,
  problemLink?: string,
  dayIndex?: number,
  part1Solution?: (data: string) => number | null,
  part2Solution?: (data: string) => number | null
}

type SolutionState = 'NODATA' | 'WAITING' | 'CALCULATING' | 'ERROR' | 'SOLVED';

const RouteLayout: React.FC<RouteLayoutProps> = ({
  name,
  children,
  problemLink,
  dayIndex,
  part1Solution,
  part2Solution,
}) => {
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
  const [part2Answer, setPart2Answer] = useState<number | null>(null);
  const [part1Answer, setPart1Answer] = useState<number | null>(null);
  const [part1State, setPart1State] = useState<SolutionState>('NODATA');
  const [part2State, setPart2State] = useState<SolutionState>('NODATA');

  const onFileChanged = (fd: string) => {
    if (!fd) {
      setPart1State(() => 'NODATA');
      setPart2State(() => 'NODATA');
    } else {
      setPart1State(() => 'CALCULATING');
      setPart2State(() => 'CALCULATING');
    }

    setPart1Answer(() => null);
    setPart2Answer(() => null);
  }

  const { 
    FileInput: DataFileInput, 
    fileData
  } = useFileInput('Input Data', '.txt', 'data', dataFileInstructions, onFileChanged);

  useEffect(() => {

    const getCode = async () => {
      const res = await fetch(codeURL);
      setSolutionCode(await res.text());
    }

    if (!solutionCode && dayIndex) {
      getCode();
    }

  }, [codeURL, solutionCode, dayIndex]);

  useEffect(() => {
    if (part1State === 'CALCULATING') {

      const calculatePart1 = async () => {
        try {
          const part1 = await new Promise<number | null>((res, rej) => {
            const ans = part1Solution?.(fileData); 
            if (ans) {
              res(ans);
            } else {
              rej(ans);
            }
          });

          setPart1Answer(() => part1);
          setPart1State((() => 'SOLVED'));
        } catch {
          setPart1Answer(() => null);
          setPart1State(() => 'ERROR');
        }
      }

      setTimeout(() => calculatePart1(), 0);
    }

    if (part2State === 'CALCULATING') {

      const calculatePart2 = async () => {
        try {
          const part2 = await new Promise<number | null>((res, rej) => {
            const ans = part2Solution?.(fileData);
            if (ans) {
              res(ans);
            } else {
              rej(ans);
            }
          });

          setPart2Answer(() => part2);
          setPart2State(() => 'SOLVED');

        } catch {
          setPart2Answer(() => null);
          setPart2State(() => 'ERROR');
        }
      }
      setTimeout(() => calculatePart2(), 0);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [part1State, part2State]);
  
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

  const errorStyle = {
    color: 'red' 
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
          <div className="solution-part-header">
            <strong>Part 1</strong>
          </div>
          <i style={part1State === 'ERROR' ? errorStyle : undefined}>
            {part1State === 'NODATA' && noDataMessage}
            {part1State === 'ERROR' && fileErrorMessage}
            {part1State === 'CALCULATING' && calculating}
            {part1State === 'SOLVED' && part1Answer}
          </i>
          <div className="solution-part-header">
            <strong>Part 2</strong>
          </div>
          <i style={part2State === 'ERROR' ? errorStyle : undefined}>
            {part2State === 'NODATA' && noDataMessage}
            {part2State === 'ERROR' && fileErrorMessage}
            {part2State === 'CALCULATING' && calculating}
            {part2State === 'SOLVED' && part2Answer}
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
                maxWidth: '95VW',
                padding: 5,
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