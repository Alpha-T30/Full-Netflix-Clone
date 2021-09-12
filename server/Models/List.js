const mongoose = require("mongoose");
const opts = { toJSON: { virtuals: true } };

const ListSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true,
    },

    type: {
      type: String,
    },

    genre: {
      type: String,
    },

    movieList: { type: Array },
  },
  { timestamps: true } ,opts
);

const List = mongoose.model("List", ListSchema);
module.exports = List ;  
