const parseData = (data: string): [number, number[]][] => {
  const lines = data.split('\n');
  const equations: [number, number[]][] = [];

  for (let i = 0; i < lines.length; i++) {
    const equation = lines[i].split(':');
      if (equation.length === 2) {
      equations.push([
        parseInt(equation[0], 10),
        equation[1]?.trim().split(' ').map(n => parseInt(n, 10))
      ]);
    } 
  }

  return equations;
}

const canCalculateToTarget = (target: number, numbers: number[], n: number, withConcat: boolean = false) => {
  if (numbers.length === 1) {
    if (n * numbers[0] === target) {
      return true;
    }

    if (n + numbers[0] === target) {
      return true;
    }

    if (withConcat) {
      if (`${n}${numbers[0]}` === `${target}`) {
        return true;
      }
    }
  }

  if (numbers.length > 1) {
    if (canCalculateToTarget(target, numbers.slice(1), n * numbers[0], withConcat)) {
      return true;
    }

    if (canCalculateToTarget(target, numbers.slice(1), n + numbers[0], withConcat)) {
      return true;
    }

    if (withConcat) {
      if (canCalculateToTarget(target, numbers.slice(1), parseInt(`${n}${numbers[0]}`, 10), withConcat)) {
        return true;
      }
    }
  }

  return false;
}

export const day7Part1Solution = (data: string): number | null => {
  if (!data) {
    return null;
  }

  try {
    const equations = parseData(data);
    let totalSum = 0;

    for (let i = 0; i < equations.length; i++) {
      if (canCalculateToTarget(equations[i][0], equations[i][1].slice(1), equations[i][1][0])) {
        totalSum += equations[i][0];
      }
    }

    return totalSum;

  } catch {
    return 0;
  } 
}

export const day7Part2Solution = (data: string): number | null => {
  if (!data) {
    return null;
  }

  try {
    const equations = parseData(data);
    let totalSum = 0;

    for (let i = 0; i < equations.length; i++) {
      if (canCalculateToTarget(equations[i][0], equations[i][1].slice(1), equations[i][1][0], true)) {
        totalSum += equations[i][0];
      }
    }

    return totalSum;

  } catch {
    return 0;
  } 
}