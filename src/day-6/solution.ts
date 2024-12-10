type Position = [x: number, y: number];

const parseData = (data: string): [map: string[][], startPosition: Position] => {
  const lines = data.split('\n').map(line => line.split(''));
  let startPosition: Position = [0,0];

  lines.some((line, index) => {
    if (line.includes('^')) {
      startPosition = [line.indexOf('^') as number, index];
      return true;
    }
  });

  return [lines, startPosition];
}

enum DIRECTION {
  UP = 0,
  RIGHT = 1,
  DOWN = 2,
  LEFT = 3
}

enum POSITION_VALIDATION_RESULT {
  MOVE = 0,
  TURN = 1,
  REACHED_EXIT = 2,
  LOOP_DETECTED = 3,
}

const move = (position: Position, direction: DIRECTION): Position => {
  const [x, y] = position;

  switch (direction) {
    case DIRECTION.UP:
      return [x, y - 1];
      
    case DIRECTION.LEFT:
      return [x - 1, y];
    
    case DIRECTION.DOWN:
      return [x, y + 1];
    
    case DIRECTION.RIGHT:
      return [x + 1, y];
  }
}

const getNextDirection = (direction: DIRECTION): DIRECTION => {
  if (direction === DIRECTION.LEFT) {
    return DIRECTION.UP;
  }

  return direction + 1;
}
const loopTracker = new Set<string>();
const validatePosition = (
  position: Position, 
  xMax : number, 
  yMax: number, 
  map: string[][], 
  turnSignal: string, 
  obstacle?: Position, 
  currentDirection?: DIRECTION, 
  visitedPositions?: Map<string, [number, number, number, number]>,
): POSITION_VALIDATION_RESULT  => {  
  const [x, y] = position;
  
  if (x < 0 || y < 0 || x >= xMax || y >= yMax) {
    return POSITION_VALIDATION_RESULT.REACHED_EXIT;
  }

  const positionHistory = visitedPositions?.get(`${x},${y},${currentDirection}`);

  if (positionHistory && positionHistory[3] > 1) {
    return POSITION_VALIDATION_RESULT.REACHED_EXIT;
  }

  if (map[y][x] === turnSignal) {

    if (obstacle) {
      const [ox, oy] = obstacle;

      if (ox === x && oy === y) {
  
        // Get the position before the obstacle
        let prevX: number = 0;
        let prevY: number = 0;
        if (currentDirection === DIRECTION.UP) {
          prevY = 1;
        } else if (currentDirection === DIRECTION.DOWN) {
          prevY = -1;
        } else if (currentDirection === DIRECTION.LEFT) {
          prevX = 1;
        } else if (currentDirection === DIRECTION.RIGHT) {
          prevX = -1;
        }
        // console.log('OBSTACLE', obstacle, currentDirection);
  
        // If the position has been visited before in the same direction, a loop is found
        if (visitedPositions?.has(`${ox + prevX},${oy + prevY},${currentDirection}`)) {
          // console.log('LOOP DETECTED', `${ox + prevX},${oy + prevY},${currentDirection}`);
          loopTracker.add(`${ox},${oy}`);
          return POSITION_VALIDATION_RESULT.LOOP_DETECTED;
        }
      }
    }

    return POSITION_VALIDATION_RESULT.TURN;
  }

  return POSITION_VALIDATION_RESULT.MOVE;
}

const walkPath = (
  startPosition: Position, 
  direction: DIRECTION, 
  map: string[][], 
  obstacle?: Position,
) => {
  let currentDirection: DIRECTION = direction;
  let position: Position = startPosition;
  const uniquePositions: Map<string, DIRECTION> = new Map();
  const allVisitedPositions: Map<string, [number, number, number, number]> = new Map();
  let control = 0;

  while (control < 800) {
    const nextPosition = move(position, currentDirection);
    const nextAction = validatePosition(
      nextPosition, 
      map[0].length, 
      map.length, 
      map, 
      '#', 
      obstacle, 
      currentDirection, 
      allVisitedPositions,
    );

    if (nextAction === POSITION_VALIDATION_RESULT.LOOP_DETECTED) {
      return nextAction;

    } else if (nextAction === POSITION_VALIDATION_RESULT.MOVE) {
      // console.log('MOVE', position.toString(), '->', nextPosition.toString());
      position = nextPosition;
      uniquePositions.set(`${position[0]},${position[1]}`, currentDirection);
      if (allVisitedPositions.has(`${position[0]},${position[1]},${currentDirection}`)) {
        const existing = allVisitedPositions.get(`${position[0]},${position[1]},${currentDirection}`);
        if (existing) {
          allVisitedPositions.set(
            `${position[0]},${position[1]},${currentDirection}`, 
            [...position, currentDirection, existing[3] + 1]
          );
        }
      } else {
        allVisitedPositions.set(
          `${position[0]},${position[1]},${currentDirection}`, 
          [...position, currentDirection, 1]
        );
      }
      continue;

    } else if (nextAction === POSITION_VALIDATION_RESULT.REACHED_EXIT) {
      // console.log('EXIT REACHED');
      return obstacle ? allVisitedPositions : uniquePositions;

    } else if (nextAction === POSITION_VALIDATION_RESULT.TURN) { 
      const nextDirection = getNextDirection(currentDirection);
      // console.log('TURN', DIRECTION[currentDirection].toString(), '->', DIRECTION[nextDirection].toString());
      currentDirection = nextDirection;
    }
    control+= 1;
  }

  console.log('CONTROL REACHED', allVisitedPositions);
  return control; 
}

export const day6Part1Solution = (data: string): number | null => {
  if (!data) {
    return null;
  }

  const [map, startPosition] = parseData(data);
  const startDirection = DIRECTION.UP;
  const uniquePositions = walkPath(startPosition, startDirection, map) as Map<string, DIRECTION>;

  return uniquePositions.size;
}

export const day6Part2Solution = (data: string): number | null => {
  if (!data) {
    return null;
  }

  const startTime = Date.now();
  console.clear();
  const [map, startPosition] = parseData(data);
  const startDirection = DIRECTION.UP;
  let loopCount: number = 0;

  // Get the walking path
  const uniquePositions = walkPath(startPosition, startDirection, map, [-1,-1]);
  loopTracker.clear();

  for (const position of uniquePositions as Map<string, [number, number, number, number]>) {
    const obstacle: Position = [position[1][0], position[1][1]] as Position;
    
    // Set the start position and direction; one postion before the obstacle
    let startX = 0;
    let startY = 0;
    const obstacleDirection = position[1][2];
    if (obstacleDirection === DIRECTION.UP) {
      startY = 1;
    } else if (obstacleDirection === DIRECTION.DOWN) {
      startY = -1;
    } else if (obstacleDirection === DIRECTION.LEFT) {
      startX = 1;
    } else if (obstacleDirection === DIRECTION.RIGHT) {
      startX = -1;
    }

    const startPos: Position = [obstacle[0] + startX, obstacle[1] + startY];

    map[obstacle[1]][obstacle[0]] = '#';
    const result = walkPath(startPos, obstacleDirection, map, obstacle);
    map[obstacle[1]][obstacle[0]] = '.';

    if (result === POSITION_VALIDATION_RESULT.LOOP_DETECTED) {
      loopCount += 1;
    }
  }

  console.log(loopCount, loopTracker.size); 
  console.log(`Runtime: ${Date.now() - startTime}ms`);
  return loopTracker.size;
}