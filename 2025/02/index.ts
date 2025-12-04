import { getInputText } from "../../utils";

const input = (await getInputText()).split(",");

const isEven = (num: number) => num % 2 === 0;

const matchedRanges1: number[] = [];
input.map((range) => {
  const separationIndex = range.indexOf("-");

  let left = Number(range.slice(0, separationIndex));
  const right = Number(range.slice(separationIndex + 1));

  while (left <= right) {
    const leftStr = String(left);

    if (isEven(leftStr.length)) {
      const firstHalf = leftStr.slice(0, leftStr.length / 2);
      const secondHalf = leftStr.slice(leftStr.length / 2);

      if (firstHalf === secondHalf) {
        matchedRanges1.push(left);
      }
    }

    left++;
  }
});

console.log({ password1: matchedRanges1.reduce((ac, cu) => ac + cu, 0) });

// -----------------------
const isPattern = (input: string) => {
  let pattern = "";

  const validateLength = () =>
    pattern.length * (input.split(pattern).length - 1) === input.length;

  for (let index = 0; index < input.length; index++) {
    const char = input[index];

    if (!char) {
      continue;
    }

    const rest = input.slice(index + 1);
    if (rest.includes(pattern + char) && !validateLength()) {
      pattern += char;
      continue;
    }

    break;
  }

  return validateLength();
};

const matchedRanges2: number[] = [];
input.map((range) => {
  const separationIndex = range.indexOf("-");

  let left = Number(range.slice(0, separationIndex));
  const right = Number(range.slice(separationIndex + 1));

  while (left <= right) {
    if (isPattern(String(left))) {
      matchedRanges2.push(left);
    }

    left++;
  }
});

console.log({ password2: matchedRanges2.reduce((ac, cu) => ac + cu, 0) });
