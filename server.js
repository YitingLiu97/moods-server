const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const upload_folder = "tmp";
app.use(express.static("public"));

app.use(bodyParser.json());
app.use("/uploaded", express.static(upload_folder));

// // get list of posts
app.get("/posts", (req, res) => {
  fs.promises.readdir(upload_folder).then(files => {
    res.send(
      
      JSON.stringify(files));
  });
});

// Upload post route
app.post("/upload", (req, res) => {
  const { image } = req.body;

  var base64Data = image.replace(/^data:image\/png;base64,/, "");

  let id = Math.random()
    .toFixed(8)
    .toString()
    .slice(2);

  fs.writeFile(`${upload_folder}/${id}.png`, base64Data, "base64", err =>
    console.log(err)
  );

  res.json({ id: id });
  console.log("saved " + id);
});

// Server listener
app.listen(process.env.PORT);
console.log("Your app is listening on port " + process.env.PORT);
