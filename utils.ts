import { dirname } from "node:path";

export const getInputText = async () => {
  const basePath = dirname(Bun.argv[1]!);
  const inputPath = `${basePath}/input.txt`;
  const sampleInputPath = `${basePath}/sample-input.txt`;

  let file = Bun.file(inputPath);

  if (!(await file.exists())) {
    file = Bun.file(sampleInputPath);
  }

  return file.text();
};
