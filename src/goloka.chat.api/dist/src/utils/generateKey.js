// secret key generator
import crypto from "crypto";
function generateKey() {
    return crypto.randomBytes(64).toString("hex");
}
console.log("======================================");
console.log(`Your secret key: ${generateKey()}       `);
console.log("======================================");
//# sourceMappingURL=generateKey.js.map