import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import globalErrorHandler from "./middlewares/error.middleware";
import notFound from "./middlewares/notFound.middleware";
import router from "./routes";

const app: Application = express();

const allowedOrigins = ["http://localhost:3000", process.env.CLIENT_URL];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Platterly API is running");
});

app.use(notFound);
app.use(globalErrorHandler);

export default app;
