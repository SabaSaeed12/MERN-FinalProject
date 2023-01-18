const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

require("../db/conn");
const User = require("../models/userSchema");

router.get("/", (req, res) => {
  res.send(`hello from the server router js`);
});
//through promises
// router.post("/register", (req, res) => {
//   const { name, email, phone, work, password, cpassword } = req.body;
//   if (!name || !email || !phone || !work || !password || !cpassword) {
//     return res
//       .status(422)
//       .json({ error: "plz filled all the fields properly" });
//   }
//   User.findOne({ email: email }).then((userExist) => {
//     if (userExist) {
//       return res.status(422).json({ error: "email already exist" });
//     }
//     const user = new User({name, email, phone, work, password, cpassword})

//     user.save().then(() => {
//       res.status(201).json({message:"user registered successfully"});
//     }).catch((err) => res.status(500).json({error:"Failed to register"}));

//   }).catch(err =>{ console.log(err);});
// });

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res
      .status(422)
      .json({ error: "plz filled all the fields properly" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "email already exist" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "password is not matching" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });

      const userRegister = await user.save();

      if (userRegister) {
        res.status(201).json({ message: "user registered successfully" });
      } else {
        res.status(500).json({ error: "Failed to register" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

//  login route

router.post("/signin", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "plz filled the data" });
    }
    const userLogin = await User.findOne({ email: email });
    //console.log(userLogin);

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      token = await userLogin.generateAuthToken();
      console.log(token);

      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credential" });
      } else {
        res.json({ message: "user signin successfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credential" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
