const parseData = (data: string): number[][] => {
  const lines = data.split('\n');
  const reports:  number[][] = [];

  for (let i = 0; i < lines.length; i++) {
    reports.push(lines[i].split(' ').map(n => parseInt(n, 10)));
  }

  return reports;
}

const isReportSafe = (
  levels: number[], 
  withDampener: boolean = false,
): boolean => {
  let isSafe = true;
  let isIncreasing = false;
  let isDecreating = false;

  for (let i = 1; i < levels.length; i++) {
    const currentLevel = levels[i];
    const prevLevel = levels[i-1];

    // Define if the levels should increase or
    // decrease on first check
    if (i === 1) {
      if (currentLevel > prevLevel) {
        isIncreasing = true;

      } else if (currentLevel < prevLevel) {
        isDecreating = true;

      } else if (currentLevel === prevLevel) {
        isSafe = false;

        break;
      }
    }

    // if a level changes from increaing to decreasing
    // or remains the same it's no longer safe
    if (currentLevel > prevLevel && isDecreating) {
      isSafe = false;
      break;
    } else if (currentLevel < prevLevel && isIncreasing) {
      isSafe = false;
      break;
    } else if (currentLevel === prevLevel) {
      isSafe = false;
      break;
    }

    // If the difference between the current level and the previous
    // level is outisde of the margins or error, the report is unsafe
    const delta = Math.abs(currentLevel - prevLevel);

    if (delta > 3 || delta < 1) {
      isSafe = false;
      break;
    }
  }

  // See if removeing any one level in the report changed the report
  // from un safe to safe
  if (!isSafe && withDampener) {
    for (let i = 0; i < levels.length; i++) {
      isSafe = isReportSafe(levels.filter((v, j) => (v && j !== i)));

      if (isSafe) {
        break;
      }
    }
  }

  return isSafe;
}

const day2Part1Solution = (data: string): number => {
  const reports = parseData(data);

  let safeReportsCount: number = 0;

  for (let i = 0; i < reports.length; i++) {
    if (isReportSafe(reports[i])) {
      safeReportsCount++;
    }
  }

  return safeReportsCount;
}

const day2Part2Solution = (data: string): number => {
  const reports = parseData(data);

  let safeReportsCount: number = 0;

  for (let i = 0; i < reports.length; i++) {
    if (isReportSafe(reports[i], true)) {
      safeReportsCount++;
    }
  }

  return safeReportsCount;
}

export {
  day2Part1Solution,
  day2Part2Solution,
};