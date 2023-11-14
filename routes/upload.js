const multer = require("@koa/multer");
const fs = require("fs");
const path = require("path");
const Router = require("@koa/router");
const file = require("../controllers/file");
const router = new Router({
  prefix: "/upload",
});

//上传文件存放路径、及文件命名
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    cb(null, `${year}${month}${day}-${file.originalname}`);
  },
});
const upload = multer({
  storage,
});

router.post("/img", upload.single("myfile"), file.add);

module.exports = router;
