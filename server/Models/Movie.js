const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true,
    },

    desc: {
      type: String,
    },
    featuredImg: {
      type: String,
    },
    featuredTitle: {
      type: String,
    },
    thumbImg: {
      type: String,
    },
    trailer: {
      type: String,
    },
    fullMovie: {
      type: String,
    },
    year: {
      type: String,
    },
    duration: {
      type: String,
    },
    limit: { type: Number },
    genre: {
      type: String,
    },
    isSeries: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", MovieSchema);
module.exports = Movie;
