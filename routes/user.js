const Router = require("@koa/router");
const user = require("../controllers/user");
const router = new Router({
  prefix: "/user",
});
const { add, query, update, remove } = user;

// 用户新增
router.post("/add", add);
// 用户查询
router.get("/", query);
// 更新用户
router.post("/update", update);
// 用户删除
router.post("/del", remove);

module.exports = router;
