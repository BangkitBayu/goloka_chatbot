import express, {} from "express";
import "dotenv/config";
import cors from "cors";
import { pinoHttp } from "pino-http";
import logger from "./src/utils/logger.js";
const app = express();
const port = process.env.PORT;
app.use(cors({
    origin: `${process.env.APP_URL}:${port}`,
    methods: "GET,POST,PUT,DELETE",
}));
app.use(pinoHttp({ logger }));
app.get("/", (req, res) => {
    req.log.info("proses");
    res.send("<h1>Hello World</h1>").status(200);
});
app.get("/auth", (req, res) => {
    res.send("<h1>Hello World from auth</h1>").status(200);
});
app
    .listen(port, () => {
    console.log(`Server running on: ${process.env.APP_URL}:${port}`);
})
    .on("error", (error) => {
    throw new Error(error.message);
});
//# sourceMappingURL=server.js.map