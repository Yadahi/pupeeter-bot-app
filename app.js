const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

const indexRouter = require("./routes/index");
const { get404 } = require("./controllers/errorController");

const port = 3000;

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(indexRouter);

app.use(get404);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
