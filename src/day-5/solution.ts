const parseData = (data: string): [Map<number, number[]>, number[][]] => {
  const lines = data.split('\n');

  const rules: Map<number, number[]> = new Map<number, number[]>();
  let printOrderStartIndex: number = 0;

  for (let i = 0; i < lines.length; i++) {

    const rule = lines[i].split('|').map(n => parseInt(n, 10));

    if (rule.length === 2) {

      const pageNumber = rule[0];

      if (rules.has(pageNumber)) {

        const existingRules = rules.get(pageNumber) ?? [];
        existingRules.push(rule[1]);
        rules.set(pageNumber, existingRules.sort());

      } else {

        rules.set(pageNumber, [rule[1]]);

      }
    } else {

      printOrderStartIndex = i + 1;
      break;

    }
  }

  const printOrders: number[][] = [];
  for (let i = printOrderStartIndex; i < lines.length; i++) {
    const printOrder = lines[i].split(',').map(n => parseInt(n, 10));
    printOrders.push(printOrder);
  }

  return [rules, printOrders];
}

const getCorrectPrintOrder = (rules: Map<number, number[]>, printOrder: number[]): number[] => {
  return Array.from(printOrder).sort((page1, page2) => {
    if (rules.get(page1)?.includes(page2)) {
      return -1;
    } else if (rules.get(page2)?.includes(page1)) {
      return 1;
    }
    return 0;
  });
}

const getPrintOrderMid = (printOrder: number[]) => {
  return printOrder[Math.floor(printOrder.length / 2)];
}

export const day5Part1Solution = (data: string): number | null => {
  if (!data) {
    return null;
  }

  const [rules, printOrders] = parseData(data);

  let correctOrderMidPageTotal: number = 0;

  for (let i = 0; i < printOrders.length; i++) {
    const printOrder = printOrders[i];

    const correctPrintOrder = getCorrectPrintOrder(rules, printOrder);

    if (correctPrintOrder.join('') === printOrder.join('')) {
      correctOrderMidPageTotal += getPrintOrderMid(printOrder) || 0;
    }
  }

  return correctOrderMidPageTotal;
}

export const day5Part2Solution = (data: string): number | null => {
  if (!data) {
    return null;
  }

  const [rules, printOrders] = parseData(data);

  let correctedPrintOrdersMidPageTotal: number = 0;

  for (let i = 0; i < printOrders.length; i++) {
    const printOrder = printOrders[i];

    const correctPrintOrder = getCorrectPrintOrder(rules, printOrder);

    if (correctPrintOrder.join('') !== printOrder.join('')) {
      correctedPrintOrdersMidPageTotal += getPrintOrderMid(correctPrintOrder) || 0;
    }
  }

  return correctedPrintOrdersMidPageTotal;
}