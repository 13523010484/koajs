const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mydb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Users = mongoose.model(
  "users",
  new mongoose.Schema({
    name: String,
    email: String,
    password: String,
  })
);

const Files = mongoose.model(
  "files",
  new mongoose.Schema({
    userName: String,
    userId: String,
    fileName: String,
    fileType: String,
    filePath: String,
    fileSize: Number,
    isDelete: Boolean,
    createTime: Date,
    updateTime: Date,
  })
);

module.exports = {
  Users,
  Files,
};
