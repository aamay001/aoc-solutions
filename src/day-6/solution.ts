type Direction = 0 | 1 | 2 | 3;
type Position = [x: number, y: number];

const DIRECTION: Record<string, Direction> = {
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3
} as const;

type BoundsCheck = {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
};

type DirectionInfo = {
  next: Direction;
  dx: number;
  dy: number;
};

const DIRECTION_INFO: Record<Direction, DirectionInfo> = {
  [0]: { next: 1, dx: 0, dy: -1 },
  [1]: { next: 2, dx: 1, dy: 0 },
  [2]: { next: 3, dx: 0, dy: 1 },
  [3]: { next: 0, dx: -1, dy: 0 }
} as const;

const parseData = (data: string): [map: string[][], startPosition: Position] => {
  const lines = data.trim().split('\n').map(line => line.split(''));
  let startPosition: Position = [0,0];

  lines.some((line, index) => {
    if (line.includes('^')) {
      startPosition = [line.indexOf('^') as number, index];
      return true;
    }
  });

  return [lines, startPosition];
}

const walkPath = (
  startPosition: Position,
  startDirection: Direction,
  map: string[][],
  mapWidth: number
): Set<number> => {
  const visited = new Set<number>();
  let [x, y] = startPosition;
  let currentDirection = startDirection;
  const mapHeight = map.length;
  
  // Pre-calculate bounds
  const bounds: BoundsCheck = {
    minX: 0,
    minY: 0,
    maxX: mapWidth - 1,
    maxY: mapHeight - 1
  };
  
  visited.add(y * mapWidth + x);
  
  while (true) {
    const { dx, dy, next } = DIRECTION_INFO[currentDirection];
    const nextX = x + dx;
    const nextY = y + dy;
    
    if (nextX < bounds.minX || nextY < bounds.minY || 
        nextY > bounds.maxY || nextX > bounds.maxX) {
      break;
    }
    
    if (map[nextY][nextX] === '#') {
      currentDirection = next;
    } else {
      x = nextX;
      y = nextY;

      // Add position to visited set, using a single number
      // to represent the position
      visited.add(y * mapWidth + x);
    }
  }
  
  return visited;
}

const isValidLoopPosition = (
  position: Position,
  startPosition: Position,
  startDirection: Direction,
  map: string[][]
): boolean => {
  // Don't allow obstacle at start position
  if (position[0] === startPosition[0] && position[1] === startPosition[1]) {
    return false;
  }

  // Track positions and directions to detect loops
  const visited = new Set<string>();
  let [x, y] = startPosition;
  let currentDirection = startDirection;
  const mapWidth = map[0].length;
  const mapHeight = map.length;

  while (true) {
    const positionWithDirection = `${x},${y},${currentDirection}`;
    
    // If we've been here in this direction before, it's a loop
    if (visited.has(positionWithDirection)) {
      return true;
    }
    
    visited.add(positionWithDirection);
    
    // Check next position
    const { dx, dy, next } = DIRECTION_INFO[currentDirection];
    const nextX = x + dx;
    const nextY = y + dy;
    
    // Check if we're out of bounds
    if (nextX < 0 || nextY < 0 || nextY >= mapHeight || nextX >= mapWidth) {
      return false;
    }
    
    // Check if there's an obstacle ahead (including our test position)
    if (map[nextY][nextX] === '#' || (nextX === position[0] && nextY === position[1])) {
      currentDirection = next;
    } else {
      x = nextX;
      y = nextY;
    }
  }
}

export const day6Part1Solution = (data: string): number | null => {
  if (!data) {
    return null;
  }

  const [map, startPosition] = parseData(data);
  const mapWidth = map[0].length;
  return walkPath(startPosition, DIRECTION.UP, map, mapWidth).size;
}

export const day6Part2Solution = (data: string): number | null => {
  if (!data) {
    return null;
  }

  const [map, startPosition] = parseData(data);
  const mapWidth = map[0].length;
  const visited = walkPath(startPosition, DIRECTION.UP, map, mapWidth);
  let validLoops = 0;

  // Pre-calculate start position key
  const startPosKey = startPosition[1] * mapWidth + startPosition[0];
  
  for (const posKey of visited) {
    if (posKey === startPosKey) continue;
    
    // Inline position calculations; see key encoding on line 84
    const x = posKey % mapWidth;
    const y = (posKey / mapWidth) | 0; // Faster than Math.floor
    
    if (isValidLoopPosition([x, y], startPosition, DIRECTION.UP, map)) {
      validLoops++;
    }
  }

  return validLoops;
}