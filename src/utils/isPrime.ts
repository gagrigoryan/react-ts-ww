export const isPrime = (n: number): boolean => {
  const sqrt = Math.sqrt(n);
  for (let i = 2; i < n; ++i) {
    if (n % i === 0) return false;
  }
  return true;
};
