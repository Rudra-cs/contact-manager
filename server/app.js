const express = require("express");
const dbConn = require("./config/db.conn");
const logger = require("./middleware/logger");
const contactRoutes = require("./routes/contacts");
const userRoutes = require("./routes/users");
const cors = require("cors");

const corsOption = {
  origin: "*",
};
const port = process.env.PORT || 3000;
const app = express();
app.use(cors(corsOption));

app.use(logger);
app.use(express.json());
app.use("/api/contact", contactRoutes);
app.use("/api/user", userRoutes);

dbConn();

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
