const parseData = (data: string) => {
  const dataPairs: [number, number][] = [];

  for (let i = 0; i < data.length; i+= 2) {
    const pair: [number, number] = [Number(data[i]), Number(data[i + 1])];
    dataPairs.push(pair);
  }

  return dataPairs;
}

const decompress = (dataPairs: [number, number][]): number[] => {
  const decompressedData = [];

  for (let i = 0; i < dataPairs.length; i++) {
    const [file, freeSpace] = dataPairs[i];
    for (let j = 0; j < file; j++) {
      decompressedData.push(i);
    }
    for (let j = 0; j < freeSpace; j++) {
      decompressedData.push(-1);
    }
  }

  return decompressedData;
}


const fragment = (data: number[]): number[] => {
  let freeSpaceIndex = data.indexOf(-1);

  if (freeSpaceIndex === -1) {
    return data
  }
  
  let fileBlockIndex = data.length - 1;

  for (let i = fileBlockIndex; i > freeSpaceIndex; i--) {
    if (data[i] > -1) {
      fileBlockIndex = i;
      data[freeSpaceIndex ] = data[fileBlockIndex];
      data[fileBlockIndex] = -1;
      freeSpaceIndex = data.indexOf(-1, freeSpaceIndex + 1);
    }
  }
  
  return data
}

interface FindLastFileResult {
  startIndex: number;
  endIndex: number;
  size: number;
  fileId: number;
}

const findLastFile = (data: number[], endPosition: number): FindLastFileResult => {
  // Start from the end of the array
  for (let i = endPosition; i >= 0; i--) {
    // Skip free space blocks
    if (data[i] === -1) {
      continue;
    }
    
    const fileId = data[i];
    const endIndex = i;
    let startIndex = i;
    
    // Scan backwards to find the start of this file
    while (startIndex >= 0 && data[startIndex] === fileId) {
      startIndex--;
    }
    // Adjust startIndex since we went one too far
    startIndex++;
    
    const size = endIndex - startIndex + 1;
    
    return {
      startIndex,
      endIndex,
      size,
      fileId
    };
  }
  
  // If we get here, no files were found
  return {
    startIndex: -1,
    endIndex: -1,
    size: 0,
    fileId: -1
  };
}

const findFreeSpace = (data: number[], requiredSize: number): number | null => {
  let i = 0;
  while (i < data.length) {
    // Skip non-free spaces
    if (data[i] !== -1) {
      i++;
      continue;
    }
    
    // Count contiguous free spaces
    let spaceSize = 0;
    let j = i;
    
    while (j < data.length && data[j] === -1) {
      spaceSize++;
      j++;
    }
    
    if (spaceSize >= requiredSize) {
      return i;
    }
    
    // Skip the entire block we just counted
    i = j;
  }
  
  return null;
}

const moveFile = (data: number[], fileInfo: FindLastFileResult, targetIndex: number): number[] => {
  // Move the file to the new location
  for (let i = 0; i < fileInfo.size; i++) {
    data[targetIndex + i] = fileInfo.fileId;
    data[fileInfo.startIndex + i] = -1;
  }
  
  return data;
}

const calculateChecksum = (data: number[]): number => {
  return data.reduce((acc, data, index) =>
    acc + ( data === -1
              ? 0
              : (data * index)
          )
  , 0);
}

export const day9Part1Solution = (data: string): number | null => {
  if (!data) {
    return null;
  }

  const dataPairs = parseData(data);
  const decompressedData = decompress(dataPairs);
  const fragmentedData = fragment(decompressedData);

  return calculateChecksum(fragmentedData);
}

export const day9Part2Solution = (data: string): number | null => {
  if (!data) {
    return null;
  }

  const dataPairs = parseData(data);
  const decompressedData = decompress(dataPairs);
  let lastPosition = decompressedData.length - 1;

  while (lastPosition >= 0) {
    // Find the last file before our current position
    const fileInfo = findLastFile(decompressedData, lastPosition);
    
    // If no files found, we're done
    if (fileInfo.fileId === -1) break;
    
    // Try to find space for this file
    const targetIndex = findFreeSpace(decompressedData, fileInfo.size);
    
    // If no space found or moving wouldn't help, update lastPosition and continue
    if (targetIndex === null || targetIndex >= fileInfo.startIndex) {
      lastPosition = fileInfo.startIndex - 1;
      continue;
    }
    
    // Move the file
    moveFile(decompressedData, fileInfo, targetIndex);
    lastPosition = fileInfo.startIndex - 1;
  }

  return calculateChecksum(decompressedData);
}