const express = require("express");
const app = express();

const dotenv = require("dotenv");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//PORT SETTINGS
dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT || 8080;

//LOAD Routers
app.use("/", require("./server/routes/router"));

//404 PAGE NOT FOUND
app.use((req, res) => {
  res.json({
    status: "failed",
    message: "url not found",
  });
});

app.listen(PORT);
