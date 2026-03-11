import csvParser from "csv-parser";
import fs from "fs";

/**
 *
 * @param {string} path
 */

async function readCsv(path , encoding) {
  const results = [];
  return new Promise((resolve, rejects) => {
    fs.createReadStream(path, { encoding: encoding })
      .pipe(
        csvParser({
          mapHeaders: ({ header, index }) => header.toLowerCase(),
        }),
      )
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
