const { calculate, runCli } = require("../calculator");

describe("calculate", () => {
  describe("addition", () => {
    test("adds the example operands from the calculator image", () => {
      expect(calculate(2, "+", 3)).toBe(5);
    });

    test("handles negative and decimal operands", () => {
      expect(calculate(-2, "+", 3.5)).toBe(1.5);
    });
  });

  describe("subtraction", () => {
    test("subtracts the example operands from the calculator image", () => {
      expect(calculate(10, "-", 4)).toBe(6);
    });

    test("handles negative operands", () => {
      expect(calculate(-10, "-", -4)).toBe(-6);
    });
  });

  describe("multiplication", () => {
    test("multiplies the example operands from the calculator image", () => {
      expect(calculate(45, "*", 2)).toBe(90);
    });

    test("handles zero and decimal operands", () => {
      expect(calculate(0, "*", 12.5)).toBe(0);
      expect(calculate(1.5, "*", 2)).toBe(3);
    });
  });

  describe("division", () => {
    test("divides the example operands from the calculator image", () => {
      expect(calculate(20, "/", 5)).toBe(4);
    });

    test("returns a decimal result when division is not even", () => {
      expect(calculate(7, "/", 2)).toBe(3.5);
    });

    test("rejects division by zero", () => {
      expect(() => calculate(20, "/", 0)).toThrow("Cannot divide by zero.");
    });
  });

  test("rejects non-numeric operands", () => {
    expect(() => calculate(Number.NaN, "+", 1)).toThrow(
      "Both operands must be valid numbers.",
    );
    expect(() => calculate(1, "+", Infinity)).toThrow(
      "Both operands must be valid numbers.",
    );
  });

  test("rejects unsupported operators", () => {
    expect(() => calculate(1, "%", 2)).toThrow(
      "Supported operations are +, -, *, and /.",
    );
  });
});

describe("runCli", () => {
  test("parses command-line operands and calculates the result", () => {
    expect(runCli(["2", "+", "3"])).toBe(5);
    expect(runCli(["45", "*", "2"])).toBe(90);
  });

  test("rejects an incorrect number of arguments", () => {
    expect(() => runCli(["2", "+"])).toThrow(
      "Usage: node src/calculator.js <number> <operator> <number>",
    );
  });

  test("rejects non-numeric command-line operands", () => {
    expect(() => runCli(["two", "+", "3"])).toThrow(
      "Both operands must be valid numbers.",
    );
  });
});
