const router = require("express").Router();
const List = require("../Models/List");
const CryptoJS = require("crypto-js");
const varify = require("../tokenVerify.js");

//Create List List

router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newList = new List(req.body);
    newList.save((err, List) => {
      if (List) {
        res.send(List);
      } else {
        res.send(err);
      }
    });
  } else {
    res.send("You can't create Lists because you are not a admin bitch");
  }
});

// delete list
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    await List.findByIdAndDelete(req.params.id, (err) => {
      if (!err) {
        res.send("list deleted successfully");
      } else {
        res.send(err);
      }
    });
  } else {
    res.send("You can't delete Lists because you are not a admin bitch");
  }
});

// Get list
router.get("/", varify, async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list;

  try {
    if (typeQuery) {
      if (genreQuery) {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
        res.send(list);
      } else {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },
        ]);
        res.send(list);
      }
    } else {
      list = await List.aggregate([
        {
          $sample: { size: 10 },
        },
      ]);
      res.send(list);
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
