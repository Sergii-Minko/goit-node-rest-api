import express from "express";
import morgan from "morgan";
import cors from "cors";

import contactsRouter from "./routes/contactsRouter.js";
import authRouter from "./routes/auth-router.js";
import env from "./helpers/env.js";

const startServer = () => {
  const app = express();
  const port = Number(env("PORT", 3000));
  
  app.use(morgan("tiny"));
  app.use(cors());
  app.use(express.json());
  app.use(express.static("public"));

  app.use("/api/users", authRouter);

  app.use("/api/contacts", contactsRouter);

  app.use((_, res) => {
    res.status(404).json({ message: "Route not found" });
  });

  app.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ message });
  });

  app.listen(port, () => console.log(`Server running on ${port} PORT`));
};
export default startServer;
