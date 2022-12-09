import fs from "fs";
import path from "path";

async function solution() {
  const input = await fs
    .readFileSync(path.resolve(__dirname, "./assets/input.txt"), {
      encoding: "utf-8",
    })
    .split("\n");

  const length = input.length;
  const edgesCount = input[0].length * 2 + (length - 2) * 2;
  const numbers: any = {};
  let count = 0;

  try {
    input.map((item, index) => {
      if (index === 0 || index === length - 1) {
        return count;
      }

      const lineNumbers = item.split("").map((next) => parseInt(next, 10));
      const columnsTopNumber = input
        .slice(0, index)
        .map((next) => next.split("").map((next) => parseInt(next, 10)));
      const columnsBottomNumber = input
        .slice(index + 1, length)
        .map((next) => next.split("").map((next) => parseInt(next, 10)));

      for (let i = 0; i < item.length; i++) {
        const currentNumber = parseInt(item.charAt(i), 10);
        if (i >= 1 && i < item.length - 1) {
          const right = lineNumbers.slice(i + 1, lineNumbers.length);
          const left = lineNumbers.slice(0, i);
          const top = columnsTopNumber.map((next) => next[i]);
          const bottom = columnsBottomNumber.map((next) => next[i]);

          const rightFilter = right.every((next) => next < currentNumber);
          const leftFilter = left.every((next) => next < currentNumber);
          const topFilter = top.every((next) => next < currentNumber);
          const bottomFilter = bottom.every((next) => next < currentNumber);
          if (rightFilter || leftFilter || topFilter || bottomFilter) {
            // numbers[index].push(currentNumber);
            count++;
          }
        }
      }

      return count;
    });

    console.log({
      result: count + edgesCount,
    });
  } catch (err) {
    console.error(err);
  }
}

solution();
