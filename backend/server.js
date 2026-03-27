const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const tenantMiddleware = require("./middleware/tenant");

app.use("/t/:tenant", tenantMiddleware);

app.use("/t/:tenant/auth", require("./routes/auth"));
app.use("/t/:tenant/projects", require("./routes/projects"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});