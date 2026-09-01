const { calculate, modulo, power, squareRoot, runCli } = require("../calculator");

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
    expect(() => calculate(1, "&", 2)).toThrow(
      "Supported operations are +, -, *, /, %, and ^.",
    );
  });
});

describe("additional operations", () => {
  test("calculates the modulo example from the extended operations image", () => {
    expect(modulo(5, 2)).toBe(1);
    expect(calculate(5, "%", 2)).toBe(1);
  });

  test("handles negative modulo operands", () => {
    expect(modulo(10, 3)).toBe(1);
    expect(modulo(-10, 3)).toBe(-1);
  });

  test("rejects modulo by zero", () => {
    expect(() => modulo(10, 0)).toThrow("Cannot calculate modulo by zero.");
  });

  test("calculates the power example from the extended operations image", () => {
    expect(power(2, 3)).toBe(8);
    expect(calculate(2, "^", 3)).toBe(8);
  });

  test("handles zero and negative exponents", () => {
    expect(power(5, 0)).toBe(1);
    expect(power(2, -2)).toBe(0.25);
  });

  test("calculates the square-root example from the extended operations image", () => {
    expect(squareRoot(16)).toBe(4);
    expect(runCli(["sqrt", "16"])).toBe(4);
  });

  test("returns the square root of zero and decimal values", () => {
    expect(squareRoot(0)).toBe(0);
    expect(squareRoot(0.25)).toBe(0.5);
  });

  test("returns the square root of a non-negative number", () => {
    expect(squareRoot(9)).toBe(3);
    expect(squareRoot(2)).toBeCloseTo(Math.sqrt(2));
  });

  test("rejects square roots of negative numbers", () => {
    expect(() => squareRoot(-1)).toThrow(
      "Cannot calculate the square root of a negative number.",
    );
    expect(() => runCli(["sqrt", "-16"])).toThrow(
      "Cannot calculate the square root of a negative number.",
    );
  });

  test("rejects invalid inputs for additional operations", () => {
    expect(() => modulo(Number.NaN, 2)).toThrow(
      "Both operands must be valid numbers.",
    );
    expect(() => power(2, Infinity)).toThrow(
      "Both operands must be valid numbers.",
    );
    expect(() => squareRoot(Number.NaN)).toThrow(
      "The value must be a valid number.",
    );
  });
});

describe("runCli", () => {
  test("parses command-line operands and calculates the result", () => {
    expect(runCli(["2", "+", "3"])).toBe(5);
    expect(runCli(["45", "*", "2"])).toBe(90);
    expect(runCli(["10", "%", "3"])).toBe(1);
    expect(runCli(["2", "^", "3"])).toBe(8);
  });

  test("parses square-root command-line arguments", () => {
    expect(runCli(["sqrt", "9"])).toBe(3);
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

  test("rejects an incorrect number of square-root arguments", () => {
    expect(() => runCli(["sqrt", "9", "extra"])).toThrow(
      "Usage: node src/calculator.js sqrt <number>",
    );
  });
});
