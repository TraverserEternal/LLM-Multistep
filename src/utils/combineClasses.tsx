export const cc = (...classes: (string | undefined | boolean)[]): string => {
  return classes.filter((cl) => typeof cl === "string").join(" ");
};
