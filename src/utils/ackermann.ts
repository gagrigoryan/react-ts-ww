export const ackermann = (n: number, m: number): number => {
  if (m === 0) return n + 1;
  if (m > 0 && n === 0) return ackermann(m - 1, 1);
  return ackermann(m - 1, ackermann(m, n - 1));
};
