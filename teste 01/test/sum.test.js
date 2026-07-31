// const { sum, sub } = require("../sum");

// test("soma 1 + 2 igual a 3", () => {
//   expect(sum(1, 2)).toBe(3);
// });

// test("subtrai 5 - 2 igual a 3", () => {
//   expect(sub(5, 2)).toBe(3);
// });

const { sum, sum2 } = require("../sum");

test("soma 1 + 2 igual a 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("soma 1 + 2 + 3 igual a 6", () => {
  expect(sum2(1, 2, 3)).toBe(6);
});
