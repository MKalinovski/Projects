"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeToJson = exports.readJsonFile = void 0;
var fs_1 = __importDefault(require("fs"));
/**
 * Reads a JSON file and returns its contents.
 * @param filepath The path to the JSON file.
 * @returns The contents of the JSON file, or null if the file does not exist or cannot be read.
 */
function readJsonFile(filepath) {
    try {
        var fileContents = fs_1.default.readFileSync(filepath, "utf8");
        return JSON.parse(fileContents);
    }
    catch (error) {
        console.error("Error reading JSON file ".concat(filepath, ": ").concat(error));
        return null;
    }
}
exports.readJsonFile = readJsonFile;
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
function writeToJson(filepath, data) {
    fs_1.default.writeFileSync(filepath, JSON.stringify(data));
}
exports.writeToJson = writeToJson;
//# sourceMappingURL=db.js.map