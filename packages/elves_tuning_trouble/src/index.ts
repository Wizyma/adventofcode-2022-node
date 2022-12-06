import fs from "fs";
import path from "path";

/**
 * Tuning problem
 * PART 1:
 * find the consecutive characters that does not repeat in the string
 */

async function solution() {
  const input = await fs.readFileSync(
    path.resolve(__dirname, "./assets/input.txt"),
    { encoding: "utf-8" }
  );

  function searchAndBreak(nextIndex: number, distinctCharacters: number): any {
    let indexFound = 0;
    let string = "";

    for (let i = nextIndex; i < input.length; i++) {
      string += input[i];

      if (string.length === distinctCharacters) {
        indexFound = input.indexOf(string);
        return {
          result: string,
          index: indexFound + distinctCharacters,
        };
      }

      if (string.includes(input[i + 1])) {
        string = "";
        indexFound = 0;
        nextIndex += 1;

        return searchAndBreak(nextIndex, distinctCharacters);
      }
    }
  }

  const part1string = searchAndBreak(0, 4);
  const part2string = searchAndBreak(0, 14);
  console.log({ part1string, part2string });
}

solution();
