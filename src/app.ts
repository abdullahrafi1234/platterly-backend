import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import globalErrorHandler from "./middlewares/error.middleware";
import notFound from "./middlewares/notFound.middleware";
import router from "./routes";

const app: Application = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Platterly API is running");
});

app.use(notFound);
app.use(globalErrorHandler);

export default app;
