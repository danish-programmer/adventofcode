import { getInputText } from "../../utils";

const input = (await getInputText()).split("\n");

function findMaxJoltageForPart1(bank: string) {
  let first = bank[0];
  let second = bank[1];

  for (const char of bank.slice(2)) {
    const currentStr = `${first}${second}`;
    const num1Str = `${first}${char}`;
    const num2Str = `${second}${char}`;

    const num = String(
      Math.max(Number(currentStr), Number(num1Str), Number(num2Str))
    );

    first = num[0];
    second = num[1];
  }

  return Number(`${first}${second}`);
}

function partOne() {
  const totalJoltage: number[] = [];

  input.forEach((bank) => {
    const maxJoltage = findMaxJoltageForPart1(bank);
    totalJoltage.push(maxJoltage);
  });

  console.log({
    password1: totalJoltage.reduce((ac, cu) => ac + cu, 0),
  });
}

partOne();

function findMaxJoltageForPart2(bank: string) {
  const requiredLength = 12;
  let result = "";
  let startIndex = 0;

  // Greedy approach: for each position, pick the largest digit
  // that still leaves enough digits to complete the sequence
  for (let i = 0; i < requiredLength; i++) {
    const digitsNeeded = requiredLength - i;
    const maxStartIndex = bank.length - digitsNeeded;

    let bestDigit = "";
    let bestIndex = startIndex;

    // Find the largest digit in the valid range
    for (let j = startIndex; j <= maxStartIndex; j++) {
      if (bank[j]! > bestDigit) {
        bestDigit = bank[j]!;
        bestIndex = j;
      }
    }

    result += bestDigit;
    startIndex = bestIndex + 1;
  }

  return Number(result);
}

function partTwo() {
  const totalJoltage: number[] = [];

  input.forEach((bank) => {
    const maxJoltage = findMaxJoltageForPart2(bank);
    totalJoltage.push(maxJoltage);
  });

  console.log({
    password2: totalJoltage.reduce((ac, cu) => ac + cu, 0),
  });
}

partTwo();
