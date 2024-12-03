

export const parseData = (data: string, filter: RegExp): RegExpMatchArray | null => {

  const operations = data.match(filter);

  return operations;
}

export const day3Part1Solution = (data: string): number => {
  // Use this filter to grap only the mul(,) operations from the data
  const filter = /(mul\(){1}?([0-9]{1,3},[0-9]{1,3})(\))/g;

  // Extract only the numbers from each operaion 
  const operations = parseData(data, filter)?.map(op => {
    return op.replace('mul(', '')
      .replace(')', '')
      .split(',')
      .map(n => parseInt(n, 10));
  });;

  if (!operations) {
    return -1;
  }

  let total: number = 0;
  
  for (const op of operations) {
    total += op[0] * op[1]
  }

  return total;
}

export const day3Part2Solution = (data: string): number => {
  // Use this filter to only grab the valid operations from the data
  // do() | don't() | mul(,)
  const filter = /((mul\(){1}([0-9]{1,3},[0-9]{1,3}){1}(\){1}))|((do\(){1}(\){1}))|((don't\(){1}(\){1}))/g;

  const operations = parseData(data, filter);

  if (!operations) {
    return -1;
  }

  let add = true;
  let total = 0;

  console.log(operations);

  // Process the operations
  for (const op of operations) {

    if (op === 'do()') {

      add = true;

    } else if (op === 'don\'t()') {

      add = false;

    } else if (op.startsWith('mul(')) {

      if (add) {

        const nums = op.replace('mul(', '').replace(')', '').split(',').map(p => parseInt(p, 10));
        total += nums[0] * nums[1];

      }
    }
  }

  return total;
}