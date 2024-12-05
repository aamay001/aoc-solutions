const parseData = (data: string): string[][] => {
  const lines = data.split('\n');
  const grid: string[][] = [];

  for (let i = 0; i < lines.length; i++) {
    const chars = lines[i].split('');
    if (chars.length > 1) {
      grid.push(chars);
    }
  }

  return grid;
}

// This function searches for diagonal and vertical targets
const findTargetWord = (target: string, grid: string[][], startPosition: [number, number]): number => {

  let currentSlice = '';
  let countFound: number = 0;
  const [x , y] = startPosition;

  // scan vertical down
  if (x >= 0 && x + (target.length - 1) < grid.length) {

    const gridSlice = grid.slice(x, x + target.length);

    currentSlice = gridSlice.reduce((str, currentLine) => {
        return str + currentLine[y];
      }, '');
    
      if (currentSlice === target) {
        countFound += 1;
      }
  }

  // scan diagonal down right
  if (x >= 0 && x + (target.length - 1) < grid.length && y + target.length <= grid[x].length) {

    const gridSlice = grid.slice(x, x + target.length);

    currentSlice = gridSlice.reduce((str, current, index) => {
        return str + current[y + index];
      }, '');
    
      if (currentSlice === target) {
        countFound += 1;
      }
  }

  // scan diagonal down left
  if (x >= 0 && x + (target.length - 1) < grid.length && y - (target.length - 1) >= 0) {

    const gridSlice = grid.slice(x, x + target.length);

    currentSlice = gridSlice.reduce((str, current, index) => {
        return str + current[y - index];
      }, '');
    
      if (currentSlice === target) {
        countFound += 1;
      }
  }

  // scan vertical up
  if (x - (target.length - 1) >= 0) {

    const gridSlice = grid.slice(x - (target.length - 1), x + 1);

    currentSlice = gridSlice.reduce((str, currentLine) => {
        // Reverse the word
        return currentLine[y] + str;
      }, '');
    
      if (currentSlice === target) {
        countFound += 1;
      }
  }

  // scan diagonal up right
  if (x - (target.length - 1) >= 0 && y + (target.length - 1) < grid[x].length) {

    const gridSlice = grid.slice(x - (target.length - 1), x + 1);

    currentSlice = gridSlice.reduce((str, currentLine, index) => {
        // Reverse the word
        return currentLine[y + ((target.length - 1) - index)] + str;
      }, '');
    
      if (currentSlice === target) {
        countFound += 1;
      }
  }

  // scan diagonal up left
  if (x - (target.length - 1) >= 0 && y - (target.length - 1) >= 0) {

    const gridSlice = grid.slice(x - (target.length - 1), x + 1);

    currentSlice = gridSlice.reduce((str, currentLine, index) => {
        // Reverse the word
        return currentLine[y - ((target.length - 1) - index)] + str;
      }, '');
    
      if (currentSlice === target) {
        countFound += 1;
      }
  }
  
  return countFound;
}

const findCrossedWord = (target: string, grid: string[][], startPosition: [number, number]): number => {
  let currentSlice = '';
  let countFound: number = 0;
  const [x , y] = startPosition;
  let foundTarget = false;

  const reverseTarget = target.split('').reverse().join('');

  // scan diagonal down right
  if (x >= 0 && x + (target.length - 1) < grid.length && y + target.length <= grid[x].length) {

    const gridSlice = grid.slice(x, x + target.length);

    currentSlice = gridSlice.reduce((str, current, index) => {
        return str + current[y + index];
      }, '');
    
    if (currentSlice === target || reverseTarget === currentSlice) {
      foundTarget = true;
    }

    if (foundTarget) {
      // scan diagonal down left
      currentSlice = gridSlice.reduce((str, current, index) => {
        return str + current[(y + target.length - 1) - index];
      }, '');
      
      if (currentSlice === target || reverseTarget === currentSlice) {
        countFound += 1;
      }
    }
  }

  return countFound;
}

export const day4Part1Solution = (data: string): number | null => {
  if (!data) {
    return null;
  }

  const grid = parseData(data);

  let totalWordsFound = 0;

  // Count all instances of XMAS and SAMX in the string
  totalWordsFound += data?.match(/(XMAS)/g)?.length ?? 0;
  totalWordsFound += data?.match(/(SAMX)/g)?.length ?? 0;

  for (let i = 0; i < grid.length; i++) {
    const currentRow = grid[i];

    for (let j = 0; j < currentRow.length; j++) {
      if (currentRow[j] === 'X' || currentRow[j] === 'SAM') {
        totalWordsFound += findTargetWord('XMAS', grid, [i, j]);
      }
    }
  }

  return totalWordsFound;
}

export const day4Part2Solution = (data: string): number | null => {
  if (!data) {
    return null;
  }

  const grid = parseData(data);

  let totalXMasFound = 0;

  for (let i = 0; i < grid.length; i++) {
    const currentRow = grid[i];

    for (let j = 0; j < currentRow.length; j++) {
      if (currentRow[j] === 'M' || currentRow[j] === 'S') {
        totalXMasFound += findCrossedWord('MAS', grid, [i, j]);
      }
    }
  }
  

  return totalXMasFound;
}