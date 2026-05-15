const express = require("express");
const cors = require("cors");

import authRoutes from "./src/modules/auth/auth.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("api running");
});

app.use("/api/auth", authRoutes);

export default app;
