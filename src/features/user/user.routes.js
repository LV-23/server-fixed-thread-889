const express = require("express");
const User = require("./user.model");

const app = express.Router();

app.post("/signup", async (req, res) => {
  let reqUser = req.body;
  reqUser.type = 'customer';
  let { email } = req.body;
  let Curuser = await User.findOne({ email });
  if (Curuser) {
      res.send({
        error:true,
        message: "Email is already linked to another account."
      })
  } else {
    try {
      let user = await User.create(reqUser);
      res.send({
        error: false,
        message: "Your account has been created",
        token: `${user._id}-${user.email}-${user.type}-${user.password}`,
        type:user.type
      });
    } catch (e) {
      console.log(e)
      res.send({
        error: true,
        message: e,
      });
    }
  }
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await User.findOne({ email });

  if (user) {
    try {
      if (user.password !== password) {
        res.send({ error: true, message: "Wrong Passwod! Please try again." });
      } else {
        res.status(200).send({
          error: false,
          message: "You've logged in successfully.",
          token: `${user._id}-${user.email}-${user.type}-${user.password}`,
          type:user.type
        });
      }
    } catch (e) {
      res
        .status(401)
        .send({ error: true, message: "Somthing went wrong. Please try again." });
    }
  } else {
    res.send({ error: true, message: "No such user present/Invalid email" })
  }
});

module.exports = app;
