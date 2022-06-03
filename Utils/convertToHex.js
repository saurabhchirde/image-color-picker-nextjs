export const valueToHex = (value) => {
  const hex = value?.toString(16);
  if (value < 16) {
    hex = "0" + hex;
  }
  return hex;
};

export const rgbToHex = (r, g, b) => {
  return "#" + valueToHex(r) + valueToHex(g) + valueToHex(b);
};
