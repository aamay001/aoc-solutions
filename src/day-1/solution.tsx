const parseData = (data: string): [number[], number[]] => {
  const list1 = [];
  const list2 = [];

  const lines = data.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const parts = lines[i].split('   ');
    list1.push(parseInt(parts[0], 10));
    list2.push(parseInt(parts[1], 10));
  }

  return [list1, list2];
}

const day1Part1Solution = (data: string): number => {
  const lists = parseData(data);

  const sortedList1 = lists[0].sort();
  const sortedList2 = lists[1].sort();

  let totalDistance: number = 0;

  for (let i = 0; i < sortedList1.length; i++) {
    totalDistance += Math.abs(sortedList1[i] - sortedList2[i]);
  }

  return totalDistance;
}

const day1Part2Solution = (data: string): number => {
  const lists = parseData(data);

  const list2Frequency = new Map<number,number>();

  for (let i = 0; i < lists[1].length; i++) {
    const num = lists[1][i];

    if (list2Frequency.has(num)) {
      list2Frequency.set(num, (list2Frequency.get(num) ?? 0) + 1);
    } else {
      list2Frequency.set(num, 1);
    }
  }

  const similarityScore = lists[0].reduce((total, current) => {
    return total + (current * (list2Frequency.get(current) ?? 0));
  }, 0);

  return similarityScore;
}

export {
  day1Part1Solution,
  day1Part2Solution,
};