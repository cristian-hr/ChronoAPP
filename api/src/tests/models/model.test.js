// import seq from '../../db.js';

function sum (num1, num2) {
  return num1+num2
}

test("1 + 2 = 3", () => {
  expect(sum(1,2)).toBe(3)
})