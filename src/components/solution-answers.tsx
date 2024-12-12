import {
  noDataMessage,
  fileErrorMessage,
  calculating,
} from '../constants/strings';

interface SolutionAnswerProps {
  part1Answer: number | null,
  part2Answer: number | null,
  part1State: SolutionState,
  part2State: SolutionState
}

const errorStyle = {
  color: 'red' 
};

const SolutionAnswer: React.FC<SolutionAnswerProps> = ({
  part1Answer,
  part2Answer,
  part1State,
  part2State,
}) => {

  return (
    <>
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
    </>
  );
};

export default SolutionAnswer;