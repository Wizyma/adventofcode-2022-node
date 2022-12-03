import fs from "fs";
import path from "path";

/**
 * Rock / Paper / Scissors Game
 *
 * PLAYER 1:
 * A -> Rock
 * B -> Paper
 * C -> Scissors
 *
 * PLAYER 2:
 * X -> Rock
 * Y -> Paper
 * Z -> Scissors
 *
 * POINTS
 * shapes:
 *
 * Rock -> 1
 * Paper -> 2
 * Scissors -> 3
 *
 * outcome:
 *
 * lose: 0
 * win: 6
 * draw: 3
 */

async function solution() {
  const input = await fs.readFileSync(
    path.resolve(__dirname, "./assets/input.txt"),
    { encoding: "utf-8" }
  );
  const inputArray = input.split("\n");

  const nodes = {
    X: {
      C: "win",
      A: "draw",
      B: "loose",
    },
    Y: {
      A: "win",
      B: "draw",
      C: "loose",
    },
    Z: {
      B: "win",
      C: "draw",
      A: "loose",
    },
    A: {
      Z: "win",
      X: "draw",
      Y: "loose",
    },
    B: {
      X: "win",
      Y: "draw",
      Z: "loose",
    },
    C: {
      Y: "win",
      Z: "draw",
      X: "loose",
    },

    outcome: {
      X: "loose",
      Y: "draw",
      Z: "win",
    },
    points: {
      X: 1,
      Y: 2,
      Z: 3,
      win: 6,
      loose: 0,
      draw: 3,
    },
  };

  const matchesResults = inputArray.map((match) => {
    const [player1, player2] = match.split(" ") as unknown as [
      "A" | "B" | "C",
      "Z" | "X" | "Y"
    ];
    const outcome = nodes[player2][player1] as "win" | "draw" | "loose";

    const points = nodes.points[outcome] + nodes.points[player2];

    return points;
  });

  const cheatResult = inputArray.map((match) => {
    const [player1, player2] = match.split(" ") as unknown as [
      "A" | "B" | "C",
      "Z" | "X" | "Y"
    ];
    const outcomeToGet = nodes.outcome[player2] as "loose" | "draw" | "win";
    const player1Move = nodes[player1];
    let player1Outocme = "";
    switch (outcomeToGet) {
      case "loose":
        player1Outocme = "win";
        break;
      case "win":
        player1Outocme = "loose";
        break;
      default:
        player1Outocme = "draw";
    }
    const keyToPlay = Object.keys(player1Move).filter((key: any) => {
      // @ts-expect-error always definfed
      if (player1Move[key] === player1Outocme) {
        return key;
      }
      return false;
    })[0] as "Z" | "X" | "Y";
    const points = nodes.points[keyToPlay] + nodes.points[outcomeToGet];

    return points;
  });

  const finalResult = matchesResults.reduce((prev, next) => prev + next, 0);
  const finalCheatResult = cheatResult.reduce((prev, next) => prev + next, 0);
  console.log({
    finalCheatResult,
    finalResult,
  });
}

solution();
