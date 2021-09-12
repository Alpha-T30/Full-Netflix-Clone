const router = require("express").Router();
const Movie = require("../Models/Movie");
const CryptoJS = require("crypto-js");
const varify = require("../tokenVerify.js");

//Create Movie

router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body);
    newMovie.save((err, movie) => {
      if (movie) {
        res.send(movie);
      } else {
        res.send(err);
      }
    });
  } else {
    res.send("You can't create movies because you are not a admin bitch");
  }
});

//Update a movie

router.patch("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const moviefound = await Movie.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.send(moviefound);
    } catch (error) {
      res.send(error);
    }
  } else {
    res.send("You can't create movies because you are not a admin bitch");
  }
});

//Delete Movie

router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const moviefound = await Movie.findByIdAndDelete(req.params.id);
      res.send("Movie deleted Successfully");
    } catch (error) {
      res.send(error);
    }
  } else {
    res.send("You can't create movies because you are not a admin bitch");
  }
});

// Get Movie

router.get("/find/:id", verify, async (req, res) => {
  try {
    const moviefound = await Movie.findById(req.params.id);
    res.send(moviefound);
  } catch (error) {
    res.send(error);
  }
});

//Random Movie

router.get("/random/", verify, async (req, res) => {
  const type = req.query.type;
  let movie;

  try {
    if (type ==="series") {
        movie =await Movie.aggregate([
            {$match:{isSeries:true}} , 
            {$sample:{size:1}}
        ])
    } 
    else{

        movie =await Movie.aggregate([
            {
                $match:{isSeries:false}
            } , 
            {$sample:{size:1}}
        ])

    }
     res.send(movie);
  } catch (error) {
    res.send(error);
  }
});


//get all movies 

router.get("/", verify, async (req,res)=>{
    if (req.user.isAdmin) {
        try {

            const movies = await Movie.find() ; 
            res.send(movies.reverse())
            
        } catch (error) {
            res.send(error)
            
        }
    } else {
        res.send ("You are not an Admin Bitch")
    }

})
module.exports = router;
