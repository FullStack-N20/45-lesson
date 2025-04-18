import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

import { errorMiddleware } from "./middlewares/error.middleware.js";
import { appRouter } from "./routes/index.js";
import { StatusCodes } from "http-status-codes";

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(cors());
app.use(helmet());


app.use("/api/v1", appRouter);


app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ 
    message: "Route not found",
    status: StatusCodes.NOT_FOUND 
  });
});

app.use(errorMiddleware);

export default app;