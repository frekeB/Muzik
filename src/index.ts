import dotenv from "dotenv";
dotenv.config();
import config from "./config/index";
import app from "./server";
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
