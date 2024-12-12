import { useEffect, useState, useTransition } from "react";
import { NavLink } from "react-router";
import CodeEditor from '@uiw/react-textarea-code-editor';

import { useFileInput } from "../hooks/use-file-input";
import { useCheckBox } from "../hooks/use-check-box";
import { getCodeUrl } from '../helpers/get-code-url';
import { appImageAlt } from "../constants/strings";

import { dataFileInstructions } from '../constants/strings';
import appImage from '../assets/app.png';
import SolutionAnswer from "./solution-answers";

interface RouteLayoutProps {
  name: string;
  children?: React.ReactNode,
  problemLink?: string,
  dayIndex?: number,
  part1Solution?: (data: string) => number | null,
  part2Solution?: (data: string) => number | null
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
    CheckBox: ShowDataCheckBox, 
    checked: showData 
  } = useCheckBox('Show Data', 'show-data');
  const [solutionCode, setSolutionCode] = useState<string | undefined>(undefined);
  const { 
    CheckBox: ShowCodeCheckBox,
    checked: showCode,
  } = useCheckBox('Show Code', 'show-code');
  const codeURL = getCodeUrl(dayIndex as number);
  const [part2Answer, setPart2Answer] = useState<number | null>(null);
  const [part1Answer, setPart1Answer] = useState<number | null>(null);
  const [part1State, setPart1State] = useState<SolutionState>('NODATA');
  const [part2State, setPart2State] = useState<SolutionState>('NODATA');
  const [, startTransition] = useTransition();

  // This tests the solution with no data. 
  // An unimplemented solution will throw an error
  // and render the error boundry
  useEffect(() => {
    part1Solution?.('');
    part2Solution?.('');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFileChanged = (fd: string) => {
    startTransition(() => {
      setPart1Answer(null);
      setPart2Answer(null);

      if (fd) {
        setPart1State('CALCULATING');
        setPart2State('CALCULATING');
      } else {
        setPart1State('NODATA');
        setPart2State('NODATA');
      }
    });
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
    // Stall a bit and macrotask
    setTimeout(() => {
      if (part1State === 'CALCULATING') {

        if (part1Solution) {
          const p1 = part1Solution(fileData);
          if (p1) {
            setPart1Answer(p1);
            setPart1State('SOLVED');
          } else {
            setPart1Answer(null);
            setPart1State('ERROR');
          }
        }
      }

      if (part2State === 'CALCULATING') {

        if (part2Solution) {
          const p2 = part2Solution(fileData);
          if (p2) {
            setPart2Answer(p2);
            setPart2State('SOLVED');
          } else {
            setPart2Answer(null);
            setPart2State('ERROR');
          }
        }
      }
    }, 10);

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
        <SolutionAnswer 
          part1State={part1State}
          part2State={part2State}
          part1Answer={part1Answer}
          part2Answer={part2Answer}
        />}

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