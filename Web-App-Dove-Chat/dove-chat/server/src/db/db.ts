import fs from "fs";

/**
 * Reads a JSON file and returns its contents.
 * @param filepath The path to the JSON file.
 * @returns The contents of the JSON file, or null if the file does not exist or cannot be read.
 */
export function readJsonFile<T>(filepath: string): T | null {
  try {
    const fileContents = fs.readFileSync(filepath, "utf8");
    return JSON.parse(fileContents) as T;
  } catch (error) {
    console.error(`Error reading JSON file ${filepath}: ${error}`);
    return null;
  }
}

/**
 * Writes the given data to a JSON file at the specified filepath.
 *
 * @template T - The type of data being written to the file.
 *
 * @param {string} filepath - The path to the file being written.
 * @param {T} data - The data being written to the file.
 *
 * @returns {void}
 */
export function writeToJson(filepath, data) {
  fs.writeFileSync(filepath, JSON.stringify(data));
}
