import express from "express";
import multer from "multer";
import path from "path";

const port = 8000;
const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

// Set EJS as the template engine
app.set("view engine", "ejs");
app.set("views", path.resolve("views"));

app.use(express.urlencoded({ extended: false }));

// Route for the homepage
app.get("/", (req, res) => {
  return res.render("home");
});

const upload = multer({ storage });
app.post("/uplode", upload.single("profileImage"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  return res.redirect("/");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
