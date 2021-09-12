const router = require("express").Router();
const User = require("../Models/User");
const CryptoJS = require("crypto-js");
const varify = require("../tokenVerify.js");

//update

router.patch("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.MY_SECRET
      ).toString();
    }

    try {
      const updated = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.send("You can update only your account");
  }
});

//Delete
router.delete("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    User.findByIdAndDelete(req.params.id, (err, log) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Account deleted Successfully");
      }
    });
  } else {
    res.send("You can only delete your account");
  }
});

//Get a User

router.get("/find/:id", async (req, res) => {
  try {
    user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get all Users
router.get("/", verify, async (req, res) => {
  const query = req.query.new;
  if (req.user.isAdmin) {
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.send("You  are not an Admin");
  }
});

//Get User Stat

router.get("/stat/", async (req, res) => {
  const lastYear = new Date().getFullYear() - 1;

  const test = await User.aggregate([
    {
      $group: {
        _id: { $month: "$createdAt" },
        totalUserPerMonth: {
          $sum: 1,
        },
      },
    },
  ]);
  res.send(test);
});

module.exports = router;
