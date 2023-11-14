const Koa = require("koa");
const static = require("koa-static");
const bodyParser = require("koa-bodyparser");
const jsonError = require("koa-json-error");
const parameter = require("koa-parameter");
const router = require("./routes/user.js");
const upload = require("./routes/upload.js");
const app = new Koa();
// 绑定静态文件目录
app.use(static("public"));
// 注意 bodyParser router 有先后顺序
app.use(jsonError());
app.use(bodyParser());
app.use(parameter(app));
app.use(router.routes()).use(router.allowedMethods());
app.use(upload.routes()).use(upload.allowedMethods());

app.listen(3000);
console.log("[demo] start-quick is starting at port 3000");
