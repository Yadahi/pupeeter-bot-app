import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
