import dotenv from "dotenv";
dotenv.config();
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../../generated/prisma/client.js";
const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST || "localhost",
    user: process.env.DATABASE_USERNAME || "root",
    password: process.env.DATABASE_PASSWORD || "",
    database: process.env.DATABASE_NAME || "goloka_chatbot_db",
    connectionLimit: 5,
});
const prisma = new PrismaClient({ adapter });
// prisma.$connect();
export default prisma;
// console.log(process.env.DATABASE_HOST)
//# sourceMappingURL=prisma.js.map