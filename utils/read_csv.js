import { error } from "console";
import csvParser from "csv-parser";
import fs from "fs";

/**
 *
 * @param {string} path
 */

async function readCsv(path) {
  const results = [];
  return new Promise((resolve, rejects) => {
    fs.createReadStream(path, { encoding: "utf-8" })
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        rejects(error);
      });
  });
}

export { readCsv };
