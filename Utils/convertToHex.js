export const convertToHex = (value) => {
  const hex = value?.toString(16);
  if (value < 16) {
    hex = "0" + hex;
  }
  return hex;
};
