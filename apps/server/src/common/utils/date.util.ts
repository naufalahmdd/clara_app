export const addDays = (day: number): Date => {
  return new Date(Date.now() + day * 24 * 60 * 60 * 1000);
};
