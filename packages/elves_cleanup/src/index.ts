/* eslint-disable prefer-const */
import fs from "fs";
import path from "path";

/**
 * PART 1:
 * In a range of numbers find in each list numbers that fully overlaps
 * and returns in how many of them did it happens
 *
 * PART 2:
 * Also returns the partial overlap
 */

async function solution() {
  const input = await fs.readFileSync(
    path.resolve(__dirname, "./assets/input.txt"),
    { encoding: "utf-8" }
  );

  const inputArray = input.split("\n");
  const dimensionalInput = inputArray.map((item) => {
    const [first, second] = item.split(",");
    let [first1, first2] = first.split("-").map((next) => parseInt(next, 10));
    let [second1, second2] = second
      .split("-")
      .map((next) => parseInt(next, 10));

    const finalFirstArray = [];
    const finalSecondArray = [];
    while (first1 < first2 + 1) {
      finalFirstArray.push(first1);
      first1++;
    }

    while (second1 < second2 + 1) {
      finalSecondArray.push(second1);
      second1++;
    }

    const merged = [...finalFirstArray, ...finalSecondArray];
    const finalLength = merged.length;
    const uniques = new Set(merged);

    let result = null;
    if (finalLength !== uniques.size) {
      if (
        finalFirstArray[0] <= finalSecondArray[0] &&
        finalFirstArray[finalFirstArray.length - 1] >=
          finalSecondArray[finalSecondArray.length - 1]
      ) {
        result = {
          full_overlap: true,
        };
      } else if (
        finalSecondArray[0] <= finalFirstArray[0] &&
        finalSecondArray[finalSecondArray.length - 1] >=
          finalFirstArray[finalFirstArray.length - 1]
      ) {
        result = {
          full_overlap: true,
        };
      }

      return {
        ...(result ?? {}),
        partial_overlap: true,
      };
    }

    return undefined;
  });

  console.log(dimensionalInput.filter((item) => item?.partial_overlap).length);
}

solution();
