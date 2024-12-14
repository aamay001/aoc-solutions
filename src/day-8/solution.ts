type Point = [number, number];

const parseData = (data: string) => {
  const grid = data.split('\n').map(l => l.split(''));
  return grid;
}

const addPotentialAntiNode = (
  grid: string[][], 
  antiNodeLocation: Point, 
  antiNodes: Set<string>, 
) => {

  if (antiNodeLocation[0] >= 0 && antiNodeLocation[0] < grid.length &&
    antiNodeLocation[1] >= 0 && antiNodeLocation[1] < grid[antiNodeLocation[0]].length) {
    antiNodes.add(`${antiNodeLocation[0]},${antiNodeLocation[1]}`);
  }
}

const findAntennasByFrequency = (grid: string[][]): Map<string, Point[]>  => {
  const antennas = new Map<string, Point[]>();

  // Collect all the locations with matching frequencies
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const frequency = grid[y][x];
      if (frequency !== '.') {
        if (antennas.has(frequency)) {
          const locations = antennas.get(frequency);
          locations?.push([y, x]);
        } else {
          antennas.set(frequency, [[y, x]]);
        }
      }
    }
  }

  return antennas;
}

const findAntiNodes = (grid: string[][]): number => {
  const antennasByFrequency = findAntennasByFrequency(grid);

  const antiNodes = new Set<string>();

  // For each set of antennas with the same frequency
  // Find the distance betwee the two antennas
  // and add the location of their antinodes
  for (const [, antennas] of antennasByFrequency) {

    for (let i = 0; i < antennas.length - 1; i++) {

      const currentAntenna = antennas[i];

      for (let j = i + 1; j < antennas.length; j++) {
        const otherAntenna = antennas[j];

        const antennaDistance: Point = [Math.abs(currentAntenna[0] - otherAntenna[0]), Math.abs(currentAntenna[1] - otherAntenna[1])];
        let antiNodeLocation: Point;

        if (currentAntenna[1] > otherAntenna[1]) {
          antiNodeLocation = [currentAntenna[0] + (antennaDistance[0] * 2), currentAntenna[1] - (antennaDistance[1] * 2)];
          addPotentialAntiNode(grid, antiNodeLocation, antiNodes);

          antiNodeLocation = [otherAntenna[0] - (antennaDistance[0] * 2), otherAntenna[1] + (antennaDistance[1] * 2)];
          addPotentialAntiNode(grid, antiNodeLocation, antiNodes);

        } else {
          antiNodeLocation = [currentAntenna[0] + (antennaDistance[0] * 2), currentAntenna[1] + (antennaDistance[1] * 2)];
          addPotentialAntiNode(grid, antiNodeLocation, antiNodes);

          antiNodeLocation = [otherAntenna[0] - (antennaDistance[0] * 2), otherAntenna[1] - (antennaDistance[1] * 2)];
          addPotentialAntiNode(grid, antiNodeLocation, antiNodes);
        }
      }
    }
  }

  return antiNodes.size;
}

export const day8Part1Solution = (data: string): number | null => {
  if (!data) {
    return null;
  }

  const grid = parseData(data);
  const antiNodeCount = findAntiNodes(grid);
  return antiNodeCount;
}

const arePointsCollinear = (p1: Point, p2: Point, p3: Point) => {
  // Are the slopes the same
  return (p2[0] - p1[0]) / (p2[1] - p1[1]) === (p3[0] - p2[0]) / (p3[1] - p2[1]);
}

export const day8Part2Solution = (data: string): number | null => {
  if (!data) {
    return null;
  }

  const antiNodes = new Set<string>();

  const grid = parseData(data);
  const antennasByFrequency = findAntennasByFrequency(grid);
  let foundCoNodes = false;

  for (const [, antennas] of antennasByFrequency) {
    if (antennas.length < 2) {
      continue;
    }

    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {

        for (let a1 = 0; a1 < antennas.length; a1++) {
          foundCoNodes = false;
          
          for (let a2 = a1 + 1; a2 < antennas.length; a2++) {
              const currentAntenna = antennas[a1];
              const otherAntenna = antennas[a2];

              if (arePointsCollinear([y, x], currentAntenna, otherAntenna)) {
                antiNodes.add(`${y},${x}`);
                antiNodes.add(`${currentAntenna[0]},${currentAntenna[1]}`);
                antiNodes.add(`${otherAntenna[0]},${otherAntenna[1]}`);

                foundCoNodes = true;
                break;
              }
          }

          if (foundCoNodes) {
            break;
          }
        }
      }
    }
  }

  return antiNodes.size;
}