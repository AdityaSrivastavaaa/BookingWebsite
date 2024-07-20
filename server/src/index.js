// src/index.js
const express = require("express");
const router = require("./router").default;
const path = require("path");
const PORT = 1338;
const app = express();

app.use("/", router);
app.use(express.static(path.join(__dirname, '../client/build')));

app.listen(PORT, () => {
  console.log(`Express is running on port ${PORT}`);
});
