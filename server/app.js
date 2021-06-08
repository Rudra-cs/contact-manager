const express = require("express");
const dbConn = require("./config/db.conn");
const logger = require("./middleware/logger");
const contactRoutes = require("./routes/contacts");

const port = process.env.PORT || 3000;
const app = express();

app.use(logger);
app.use(express.json());
app.use("/api", contactRoutes);

dbConn();

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
