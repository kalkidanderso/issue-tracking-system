import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import fileupload from "express-fileupload";
import router from "./routes/index.js";
import { createRequire } from "module";
import winston from "winston";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

const require = createRequire(import.meta.url);
const http = require("http");
const { Server } = require("socket.io");
const cron = require('node-cron');



dotenv.config();

// Import and run migrations on startup

const app = express();

app.use(
  fileupload({
    createParentPath: true,
  })
);

app.use(
  cors({
    credentials: true,
    origin: true, 
  })
);

app.use(cookieParser());
app.use(express.json());
try {
  app.use(router);

} catch (error) {
  console.error("Unable to connect to the database:", error);
}
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

///////////////////////////////////////////////////////

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(), // Log to console
    new winston.transports.File({ filename: "error.log", level: "error" }), // Log to file
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  exceptionHandlers: [
    new winston.transports.File({ filename: "exceptions.log" }), // Log uncaught exceptions to a separate file
  ],
});

app.use(notFound);
app.use(errorHandler(logger));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});




server.listen(process.env.PORT, async () => {
  try {
    await db.authenticate();
    console.log("Database Connected...");

    // Run migrations
    console.log("Running database migrations...");

    console.log(`Server running at  http://localhost:${process.env.PORT}`);
  } catch (error) {
    console.error("Database connection failed:", error);
  }
});
