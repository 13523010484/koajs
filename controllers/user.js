const jwt = require("jsonwebtoken");
const models = require("../model/index");
const { Users } = models;

// 登录
const login = async (ctx) => {
  console.log("ctx::", ctx.request.body);
  const { name, password } = ctx.request.body;
  await Users.findOne({ name, password })
    .then((rel) => {
      console.log("rel::", rel);
      if (rel) {
        const token = jwt.sign({ name: rel.name }, "jqh-server-jwt", {
          expiresIn: 3600 * 24 * 7,
        });
        ctx.body = {
          code: 200,
          msg: "登录成功",
          token,
        };
      } else {
        ctx.body = {
          code: 300,
          msg: "登录失败",
        };
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: "登录时出现异常",
        err,
      };
    });
};

// 用户注册
const register = async (ctx) => {
  const { name, password } = ctx.request.body;
  let isDouble = false;

  await Users.findOne({ name }).then((rel) => {
    if (rel) isDouble = true;
  });

  if (isDouble) {
    ctx.body = {
      code: 300,
      mag: "用户名已存在",
    };
    return;
  }

  const newUser = new Users({ name, password });
  await newUser
    .save()
    .then((rel) => {
      if (rel) {
        ctx.body = {
          code: 200,
          msg: "注册成功",
        };
      } else {
        ctx.body = {
          code: 300,
          msg: "注册失败",
        };
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: "注册失败",
        err,
      };
    });
};

// 添加用户
const add = async (ctx) => {
  const body = ctx.request.body;
  const newUser = new Users(body);
  await newUser
    .save()
    .then((res) => {
      console.log("User saved", res);
      ctx.body = {
        code: 200,
        msg: "保存成功",
      };
    })
    .catch((err) => {
      console.error("Error saving user:", err);
    });
};

// 查询用户
const query = async (ctx) => {
  const { name } = ctx.query;
  console.log("ctx.query::", ctx.query);
  await Users.find({
    ...(name && { name }),
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
  await Users.findOneAndUpdate(
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
  await Users.findOneAndDelete({ _id })
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
  login,
  register,
  add,
  query,
  update,
  remove,
};
