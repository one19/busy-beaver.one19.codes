export const unwrapX = strip =>
  Object.keys(strip)
    .map(key => Number.parseInt(key, 10))
    .sort((a, b) => (a > b ? 1 : -1));

export const unwrapY = strip => unwrapX(strip).map(key => strip[key]);
