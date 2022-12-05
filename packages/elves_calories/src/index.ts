import fs from "fs";
import path from "path";

async function solution() {
  const input = await fs.readFileSync(
    path.resolve(__dirname, "./assets/input.txt"),
    { encoding: "utf-8" }
  );
  const inputArray = input.split("\n");
  const nextArray = [];

  let startingIndex = 0;
  let isTrue = true;

  while (isTrue) {
    const startingEmptyPoint = inputArray.indexOf("", startingIndex);
    nextArray.push(inputArray.slice(startingIndex, startingEmptyPoint));

    if (startingEmptyPoint == -1) {
      isTrue = false;
    }
    startingIndex = startingEmptyPoint + 1;
  }

  const result = nextArray.reduce<number[]>((prev, next) => {
    return prev.concat(
      next.reduce((prev: number, next: string) => prev + parseInt(next, 10), 0)
    );
  }, []);

  const top3 = result.sort((a, b) => b - a).slice(0, 3);

  const finalResult = top3.reduce((prev, next) => prev + next, 0);
  console.log(finalResult);
}

solution();
