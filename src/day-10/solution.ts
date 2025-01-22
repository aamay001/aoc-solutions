const parseData = (data: string): string[][] | null => {
  if (!data) {
    return null;
  } 

  return data.trim().split('\n').map(line => line.split(''));
}

type Position = [x:number, y:number];
type Direction = 'up' | 'down' | 'left' | 'right';

const DIRECTIONS: Direction[] = ['up', 'down', 'left', 'right'];

const findTrailHeads = (map: string[][]) => {
  const trailHeads: Position[] = [];

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === '0') {
        trailHeads.push([x, y]);
      }
    }
  }

  return trailHeads;
}

const getNextPosition = (position: Position, direction: Direction): Position => {
  const [x, y] = position;
  switch (direction) {
    case 'up': return [x, y - 1];
    case 'down': return [x, y + 1];
    case 'left': return [x - 1, y];
    case 'right': return [x + 1, y];
  }
}

const findTrailHeadScore = (
  start: Position,
  map: string[][],
): Set<string> => {
  const height9Positions = new Set<string>();
  
  const explore = (current: Position, currentHeight: number) => {
    // If we reached height 9, add position to our set
    if (currentHeight === 9) {
      height9Positions.add(`${current[0]},${current[1]}`);
      return;
    }
    
    // Try each direction
    for (const direction of DIRECTIONS) {
      const next = getNextPosition(current, direction);
      const [nextX, nextY] = next;
      
      // Check bounds
      if (nextX < 0 || nextY < 0 || nextX >= map[0].length || nextY >= map.length) {
        continue;
      }
      
      // Check if next position has height + 1
      const nextHeight = parseInt(map[nextY][nextX]);
      if (nextHeight === currentHeight + 1) {
        explore(next, nextHeight);
      }
    }
  };
  
  // Start exploration from trailhead
  explore(start, 0);
  
  return height9Positions;
}

const findValidPathCount = (
  start: Position,
  map: string[][]
): number => {
  let pathCount = 0;
  
  const explore = (current: Position, currentHeight: number, path: Set<string>) => {
    // If we reached height 9, we found a valid path
    if (currentHeight === 9) {
      pathCount++;
      return;
    }
    
    // Try each direction
    for (const direction of DIRECTIONS) {
      const next = getNextPosition(current, direction);
      const [nextX, nextY] = next;
      
      // Check bounds
      if (nextX < 0 || nextY < 0 || nextX >= map[0].length || nextY >= map.length) {
        continue;
      }
      
      // Create position key
      const posKey = `${nextX},${nextY}`;
      
      // Skip if we've visited this position in this path
      if (path.has(posKey)) {
        continue;
      }
      
      // Check if next position has height + 1
      const nextHeight = parseInt(map[nextY][nextX]);
      if (nextHeight === currentHeight + 1) {
        // Add position to current path
        path.add(posKey);
        explore(next, nextHeight, path);
        // Remove position for backtracking
        path.delete(posKey);
      }
    }
  };
  
  // Start exploration from trailhead with empty path
  explore(start, 0, new Set<string>());
  
  return pathCount;
};

export const day10Part1Solution = (data: string): number | null => {
  if (!data) {
    return null;
  }

  const topographicMap = parseData(data);
  if (!topographicMap) {
    return null;
  }

  const trailHeads = findTrailHeads(topographicMap);
  let totalScore = 0;

  for (const trailHead of trailHeads) {
    const height9Positions = findTrailHeadScore(trailHead, topographicMap);
    totalScore += height9Positions.size;
  }

  return totalScore;
}

export const day10Part2Solution = (data: string): number | null => {
  if (!data) {
    return null;
  }

  const topographicMap = parseData(data);
  if (!topographicMap) {
    return null;
  }

  const trailheads = findTrailHeads(topographicMap);
  let totalRating = 0;

  for (const trailhead of trailheads) {
    const pathCount = findValidPathCount(trailhead, topographicMap);
    totalRating += pathCount;
  }

  return totalRating;
}