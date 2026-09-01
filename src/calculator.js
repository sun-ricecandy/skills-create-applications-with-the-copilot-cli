#!/usr/bin/env node

/**
 * Calculate a result using one of the four supported basic operations:
 * addition (+), subtraction (-), multiplication (*), or division (/).
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
    default:
      throw new Error("Supported operations are +, -, *, and /.");
  }
}

function runCli(args) {
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

module.exports = { calculate, runCli };
