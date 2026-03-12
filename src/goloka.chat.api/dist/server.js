import express, { urlencoded } from "express";
import "dotenv/config";
import cors from "cors";
import { pinoHttp } from "pino-http";
import logger from "./src/utils/logger.js";
import authRouter from "./src/routes/authRouter.js";
const app = express();
const port = process.env.PORT;
app.use(cors({
    origin: `${process.env.APP_URL}:${port}`,
    methods: "GET,POST,PUT,PATCH,DELETE",
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(pinoHttp({ logger }));
app.use("/api/v1/auth", authRouter);
app.use("/", (req, res) => {
    res
        .json({
        status: "error",
        message: "Resource not found",
    })
        .status(404);
});
app
    .listen(port, () => {
    console.log(`Server running on: ${process.env.APP_URL}:${port}`);
})
    .on("error", (error) => {
    throw new Error(error.message);
});
//# sourceMappingURL=server.js.map