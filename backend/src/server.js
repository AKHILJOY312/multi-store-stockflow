import "dotenv/config";

import app from "./app.js";
import { connectDB } from "./config/db.js";
import ENV from "./config/env.config.js";

connectDB();

app.listen(ENV.PORT, () => {
  console.log(`Server running on port ${ENV.PORT}`);
});
