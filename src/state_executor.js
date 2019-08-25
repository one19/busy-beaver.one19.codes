const allStates = {
  '0A': '1RB',
  '1A': '1LB',
  '0B': '1LA',
  '1B': '0LC',
  '0C': '1RH',
  '1C': '1LD',
  '0D': '1RD',
  '1D': '0RA',
};

// strip: { index: value... }
export const evaluate = (strip, index, stateKey = 'A', indexLog = []) => {
  if (stateKey === 'H') return { strip, log: indexLog };

  const stripValue = strip[index] || 0;
  const operation = allStates[`${stripValue}${stateKey}`];

  const updatedStrip = { ...strip, [index]: operation[0] };

  const moveIndex = operation[1] === 'R' ? 1 : -1;
  const moveTo = index + moveIndex;

  return evaluate(updatedStrip, moveTo, operation[2], [...indexLog, moveTo]);
};
