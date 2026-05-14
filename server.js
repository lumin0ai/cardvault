const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./src/config/db");

async function startServer() {
  await connectDB();
}
startServer();
