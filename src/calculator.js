#!/usr/bin/env node

/**
 * Calculate a result using a supported arithmetic operation.
 *
 * @param {number} left
 * @param {string} operator
 * @param {number} right
 * @returns {number}
 */
function calculate(left, operator, right) {
  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    throw new Error("Both operands must be valid numbers.");
  }

  switch (operator) {
    // Addition
    case "+":
      return left + right;
    // Subtraction
    case "-":
      return left - right;
    // Multiplication
    case "*":
      return left * right;
    // Division
    case "/":
      if (right === 0) {
        throw new Error("Cannot divide by zero.");
      }
      return left / right;
    // Modulo
    case "%":
      return modulo(left, right);
    // Exponentiation
    case "^":
      return power(left, right);
    default:
      throw new Error("Supported operations are +, -, *, /, %, and ^.");
  }
}

/**
 * Return the remainder of a divided by b.
 *
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function modulo(a, b) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new Error("Both operands must be valid numbers.");
  }
  if (b === 0) {
    throw new Error("Cannot calculate modulo by zero.");
  }
  return a % b;
}

/**
 * Return base raised to exponent.
 *
 * @param {number} base
 * @param {number} exponent
 * @returns {number}
 */
function power(base, exponent) {
  if (!Number.isFinite(base) || !Number.isFinite(exponent)) {
    throw new Error("Both operands must be valid numbers.");
  }
  return base ** exponent;
}

/**
 * Return the square root of n.
 *
 * @param {number} n
 * @returns {number}
 */
function squareRoot(n) {
  if (!Number.isFinite(n)) {
    throw new Error("The value must be a valid number.");
  }
  if (n < 0) {
    throw new Error("Cannot calculate the square root of a negative number.");
  }
  return Math.sqrt(n);
}

function runCli(args) {
  if (args[0] === "sqrt") {
    if (args.length !== 2) {
      throw new Error("Usage: node src/calculator.js sqrt <number>");
    }
    return squareRoot(Number(args[1]));
  }

  if (args.length !== 3) {
    throw new Error("Usage: node src/calculator.js <number> <operator> <number>");
  }

  const [leftInput, operator, rightInput] = args;
  const left = Number(leftInput);
  const right = Number(rightInput);

  return calculate(left, operator, right);
}

if (require.main === module) {
  try {
    console.log(runCli(process.argv.slice(2)));
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = { calculate, modulo, power, squareRoot, runCli };
