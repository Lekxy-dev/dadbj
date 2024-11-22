export const truncateText = (str: string) => {
  if (!str || str.length <= 25) return str; // Add a check to ensure 'str' is not null or undefined
  return str.substring(0, 25) + "...";
};
