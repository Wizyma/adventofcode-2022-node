import fs from "fs";
import path from "path";

/**
 * PART 1:
 * each item in the list represent two item in the rucksack when splited in the middle
 * each item in the list share a common letter that defines the item type (a - A)
 * there is an order (a - z -> 1 - 26 | A - Z  -> 27 - 52)
 *
 * We need to find for each string their common letter
 * then calculate the order point
 *
 * PART 2:
 * Separate in group of 3 instead of line per line, it will be each 3 lines
 */

async function solution() {
  const base = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(",");
  const points = [...base, ...base.map((item) => item.toUpperCase())];

  const input = await fs.readFileSync(
    path.resolve(__dirname, "./assets/input.txt"),
    { encoding: "utf-8" }
  );
  const inputArray = input.split("\n");

  const itemsFromInput = inputArray.map((item) => [
    item.slice(0, item.length / 2),
    item.slice(item.length / 2, item.length),
  ]);

  const withPriority = itemsFromInput
    .map((item) => {
      const [right, left] = item;
      const commonChar = right.split("").find((char) => left.includes(char));

      if (commonChar) {
        return points.indexOf(commonChar) + 1;
      }
      return null;
    })
    .filter((item) => item !== null) as number[];

  const result = withPriority.reduce((prev, next) => prev + next, 0);

  // PART 2

  const nextInput: string[][] = [];
  inputArray
    .map((_, index) => {
      if ((index + 1) % 3 === 0) {
        return index;
      }
    })
    .filter((item) => item !== undefined)
    .reduce((prev, next) => {
      nextInput.push(inputArray.slice(prev, next! + 1));
      return next! + 1;
    }, 0);

  const groupWithPriority = nextInput
    .map((item) => {
      const sorted = item.sort((a, b) => b.length - a.length);
      const [first, second, third] = sorted;

      const commonChar = first
        .split("")
        .find((char: string) => second.includes(char) && third.includes(char));

      if (commonChar) {
        return points.indexOf(commonChar) + 1;
      }
      return null;
    })
    .filter((item) => item !== null) as number[];

  const part2result = groupWithPriority.reduce((prev, next) => prev + next, 0);
  console.log(part2result);
}

solution();
