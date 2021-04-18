const express = require("express");
const fs = require("fs");
const pathModule = require("path");
const cors = require("cors");
const PORT = process.env.PORT || 3333;
const BASE_PATH =
  process.env.BASE_PATH || "/Users/bhorbhaskar.verma/Documents/";
function humanFileSize(size) {
  if (size === 0) return "0B";
  var i = Math.floor(Math.log(size) / Math.log(1024));
  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 +
    " " +
    ["B", "kB", "MB", "GB", "TB"][i]
  );
}
function getFileInfo(filename) {
  const stats = fs.statSync(filename);
  const time = stats.mtime.toISOString();
  const fileSizeInBytes = stats.size;
  return [humanFileSize(fileSizeInBytes), time];
}
function listDirectory(path) {
  dirList = [];
  try {
    dirList = fs.readdirSync(path, { withFileTypes: true });
    var finalList = dirList.map((file) => {
      let name = file.name;
      let isDir = file.isDirectory();
      let filePath = path + "/" + file.name;
      let [size, time] = getFileInfo(filePath);
      return {
        name,
        isDir,
        filePath,
        size,
        time,
      };
    });
    return finalList;
  } catch (err) {
    console.log(err.name);
    return "Directory does not exist";
  }
}

const app = express();
app.use(cors());

app.get("/folders", (req, res) => {
  const path = req.query.path ? BASE_PATH + req.query.path : BASE_PATH;
  // TODO: Prevent Directory Traversal
  const normPath = pathModule.normalize(path);
  console.log(normPath);
  if (normPath.startsWith(BASE_PATH)) {
    const response = listDirectory(normPath);

    res.send(response);
    return;
  }
  //console.log(response);
  res.send("Not Authorised");
});

app.listen(PORT, () => {
  console.log(`[*]Started server on port ${PORT}`);
});
