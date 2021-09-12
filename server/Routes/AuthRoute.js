const router = require("express").Router();
const User = require("../Models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//Register

router.post("/register/", async (req, res) => {
  const secret = process.env.MY_SECRET;

  var ciphertext = await CryptoJS.AES.encrypt(
    req.body.password,
    secret
  ).toString();

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: ciphertext,
  });

  try {
    const newuser = await newUser.save();
    res.send(newuser);
  } catch (error) {
    res.send(error);
  }
});
// if you try to send req.send more than one it would raise an error like this 
// Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client


// router.post("/login", async (req, res) => {
//   try {
//     User.findOne({ email: req.body.email }, (error, user) => {
//       if (user) {
//         let bytes = CryptoJS.AES.decrypt(user.password, process.env.MY_SECRET);
//         let originalText = bytes.toString(CryptoJS.enc.Utf8);

//         if (originalText !== req.body.password) {
//           res.send("wrong pass ");
//         } else {
//           const accessToken = jwt.sign(
//             { id: user._id, isAdmin: user.isAdmin },
//             process.env.MY_SECRET,
//             { expiresIn: "5d" }
//           );

//           const { password, ...info } = user._doc;

//           res.json({ ...info, accessToken });
//         }
//       } else {
//         res.status(401).send("yser not found");
//       }
//     });
//   } catch (error) {
//     res.send(error);
//   }
// });






//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if(!user){
      res.status(401).json("Wrong password or username!");
      // res.send("hello worng")
    } else {

      const bytes = CryptoJS.AES.decrypt(user.password, process.env.MY_SECRET);
      const originalPassword = bytes.toString(CryptoJS.enc.Utf8);


      if ( originalPassword !== req.body.password ){

        res.status(401).json("Wrong password or username!");
      
      } else {

        const accessToken = jwt.sign(
          { id: user._id, isAdmin: user.isAdmin },
          process.env.MY_SECRET,
          { expiresIn: "5d" }
        );
    
        const { password, ...info } = user._doc;
    
        res.status(200).json({ ...info, accessToken });

      }
  
    
  
    
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
