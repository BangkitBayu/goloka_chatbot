// secret key generator
import crypto from "crypto";

export function generateJwtSecret() {
  return crypto.randomBytes(64).toString("hex");
}

console.log("======================================");
console.log(`Your secret key: ${generateJwtSecret()}       `);
console.log("======================================");
