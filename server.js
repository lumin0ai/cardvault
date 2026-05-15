const dotenv = require("dotenv");
dotenv.config();

import connectDB from "./src/config/db.js";
import app from "./app.js";

async function startServer() {
  await connectDB();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
