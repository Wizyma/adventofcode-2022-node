import fs from "fs";
import path from "path";

/**
 * SUPPLY STACK
 * PART 1:
 * last in first out, one crate moved at a time
 *
 * Current stack:
 * 1: J H P M S F N V
 * 2: S R L M J D Q
 * 3: N Q D H C S W B
 * 4: R S C L
 * 5: M V T P F B
 * 6: T R Q N C
 * 7: G V R
 * 8: C Z S P D L R
 * 9: D S J V G P B F
 *
 *
 * [V]     [B]                     [F]
 * [N] [Q] [W]                 [R] [B]
 * [F] [D] [S]     [B]         [L] [P]
 * [S] [J] [C]     [F] [C]     [D] [G]
 * [M] [M] [H] [L] [P] [N]     [P] [V]
 * [P] [L] [D] [C] [T] [Q] [R] [S] [J]
 * [H] [R] [Q] [S] [V] [R] [V] [Z] [S]
 * [J] [S] [N] [R] [M] [T] [G] [C] [D]
 * 1   2   3   4   5   6   7   8   9
 * We need to find the first element in the stack on the top
 */

async function solution() {
  const input = await fs.readFileSync(
    path.resolve(__dirname, "./assets/input.txt"),
    { encoding: "utf-8" }
  );

  // write a parser next time
  const default_stack = [
    ["J", "H", "P", "M", "S", "F", "N", "V"], // 1
    ["S", "R", "L", "M", "J", "D", "Q"], // 2
    ["N", "Q", "D", "H", "C", "S", "W", "B"], // 3
    ["R", "S", "C", "L"], // 4
    ["M", "V", "T", "P", "F", "B"], // 5
    ["T", "R", "Q", "N", "C"], // 6
    ["G", "V", "R"], // 7
    ["C", "Z", "S", "P", "D", "L", "R"], // 8
    ["D", "S", "J", "V", "G", "P", "B", "F"], // 9
  ];

  const arrayFromInput = input
    .split("\n")
    .map((item) => item.split(" ").map((nextNums) => parseInt(nextNums, 10)));

  arrayFromInput.forEach((instructions) => {
    const [move, from, to] = instructions;
    const fromStack = default_stack[from - 1];
    const toStack = default_stack[to - 1];

    const itemsToMove = fromStack.splice(fromStack.length - move, move);
    // PART1: toStack.push(...itemsToMove.reverse());

    // PART2
    toStack.push(...itemsToMove);
  });

  const result = default_stack
    .filter((stack) => stack.length > 0)
    .map((stack) => stack[stack.length - 1])
    .join("");

  console.log(result);
}

solution();
