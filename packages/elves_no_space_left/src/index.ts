import fs from "fs";
import path from "path";

/**
 * Credits to: https://github.com/madalinul/advent-of-code-2022/blob/8c79e1cb6f5ea2a77615a0f828586b3c21c23adc/day7/solution.ts
 * Need to learn more about this one
 */
async function getSolution() {
  try {
    const data: string = await fs.readFileSync(
      path.resolve(__dirname, "./assets/input.txt"),
      { encoding: "utf-8" }
    );

    const lines = data.split("\n");
    const root = new Folder("/", null);
    let currentFolder = root;
    for (const line of lines) {
      if (line.startsWith("$ cd")) {
        if (line.includes("cd ..") && currentFolder.parent) {
          currentFolder = currentFolder.parent as Folder;
        } else {
          const folderName = line.split(" ")[2];
          const folder = currentFolder.children.find(
            (folder) => folder.name === folderName
          );
          if (folder) {
            currentFolder = folder;
          }
        }
      } else if (!line.includes("$")) {
        const [first, second] = line.split(" ");
        if (first === "dir") {
          currentFolder.children.push(new Folder(second, currentFolder));
        } else {
          currentFolder.size += parseInt(first);
        }
      }
    }
    addSizeToFolders(root);
    const neededSpace = root.size - 40000000;
    computeSmallestFolderToDelete(root, neededSpace);

    console.log("PART1: ", smallSum);
    console.log("PART2: ", minFolderSize);
  } catch (err) {
    console.log(err);
  }
}

getSolution();

let smallSum = 0;
let minFolderSize = Number.MAX_VALUE;

const addSizeToFolders = (folder: Folder) => {
  for (const child of folder.children) {
    folder.size += addSizeToFolders(child);
  }
  if (folder.size <= 100000) {
    smallSum += folder.size;
  }
  return folder.size;
};

const computeSmallestFolderToDelete = (folder: Folder, neededSpace: number) => {
  if (folder.size >= neededSpace) {
    console.log("folder size bigger");
    if (folder.size < minFolderSize) {
      minFolderSize = folder.size;
    }
  }
  for (const child of folder.children) {
    computeSmallestFolderToDelete(child, neededSpace);
  }
};

class Folder {
  name: string;
  size: number;
  children: Folder[];
  parent: Folder | null;

  constructor(name: string, parent: Folder | null) {
    this.name = name;
    this.size = 0;
    this.children = [];
    this.parent = parent;
  }
}
