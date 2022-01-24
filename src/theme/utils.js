// Remove
export default {
  spacing: (number) => {
    const base = 0.25;
    let total = base;
    if (number) {
      total = base * number;
    }

    return `${total}rem`;
  }
};
