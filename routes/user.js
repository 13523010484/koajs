const Router = require("@koa/router");
const user = require("../controllers/user");
const router = new Router({
  prefix: "/user",
});

// 用户登录
router.post("/login", user.login);
// 用户注册
router.post("/register", user.register);
// 用户新增
router.post("/add", user.add);
// 用户查询
router.get("/", user.query);
// 更新用户
router.post("/update", user.update);
// 用户删除
router.post("/del", user.remove);

module.exports = router;
