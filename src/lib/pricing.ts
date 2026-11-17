export function yearlyMonthly(monthKurus: number): number {
  return Math.round((monthKurus * 10) / 12);
}

export function yearlyTotal(monthKurus: number): number {
  return monthKurus * 10;
}
