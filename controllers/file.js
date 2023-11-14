const models = require("../model/index");
const { Files } = models;

// 添加用户
const add = async (ctx, next) => {
  console.log("ctx::====================", ctx);
  const body = ctx.request.body;
  const newFile = new Files({
    userName: body.userName,
    userId: body.userId,
    fileName: ctx.file.filename,
    fileType: ctx.file.originalname,
    filePath: ctx.file.path,
    fileSize: ctx.file.size,
    isDelete: 0,
    createTime: new Date(),
    updateTime: null,
  });
  await newFile
    .save()
    .then((res) => {
      console.log("res::", res);
      ctx.body = {
        code: 200,
        data: ctx.file,
      };
    })
    .catch((err) => {
      console.log("err::", err);
    });
};

// 查询用户
const query = async (ctx) => {
  const { name } = ctx.query;
  console.log("ctx.query::", ctx.query);
  await Files.find({
    ...(name && { name: /name/ }),
  })
    .then((res) => {
      ctx.body = {
        code: 200,
        msg: "查询成功",
        list: res,
      };
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: "查询失败",
      };
    });
};

// 修改用户
const update = async (ctx) => {
  const { _id, name, email, password } = ctx.request.body;
  // update table set name='张三',email='dd@qq.com',password='12' where id = id
  await Files.findOneAndUpdate(
    {
      _id, // 相当于 where 条件
    },
    {
      name, // 相当于 set 后面的
      email,
      password,
    }
  )
    .then((res) => {
      console.log("更新::", res);
      if (res) {
        ctx.body = {
          code: 200,
          msg: "修改成功",
        };
      } else {
        ctx.body = {
          code: 202,
          msg: "修改失败",
        };
      }
    })
    .catch((error) => {
      console.log("error::", error);
    });
};

// 删除用户
const remove = async (ctx) => {
  const { _id } = ctx.request.body;
  await Files.findOneAndDelete({ _id })
    .then((res) => {
      console.log("res::", res);
      if (res) {
        ctx.body = {
          code: 200,
          msg: "删除成功",
        };
      } else {
        ctx.body = {
          code: 500,
          msg: "删除失败",
        };
      }
    })
    .catch((err) => {
      console.log("err::", err);
    });
};

module.exports = {
  add,
  query,
  update,
  remove,
};
