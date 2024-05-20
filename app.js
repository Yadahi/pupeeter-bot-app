const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const indexRouter = require("./routes/index");

const port = 3000;

app.set("view engine", "ejs");
app.set("views", "views");

app.use(indexRouter);

app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
