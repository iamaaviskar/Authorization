import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import morgan from "morgan";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 3000;
let access = false;

const usrName = "AMBATUKAM";
const pass = "BUSS";

function auth(req, res, next) {
  const username = req.body["username"];
  const password = req.body["password"];

  access = usrName === username && pass === password ? true : false;

  next();
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(auth);

app.use(morgan("common"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/check", (req, res) => {
  if (access) {
    res.sendFile(__dirname + "/views/congrats.html");
  } else {
    res.redirect("/");
  }
});

app.listen(PORT, (req, res) => {
  console.log("Server is running");
});
