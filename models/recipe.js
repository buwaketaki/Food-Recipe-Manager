const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({

  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  rec_nm: {
    type: String,
    required: true
  },
  calories: {
    type: Number,
    required: true
  },
  discp: {
    type: String,
    required: true
  },
  author: {
    id: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "user"
    },
 },
 comments: [
  {
     type: mongoose.Schema.Types.ObjectId,
     ref: "Comment"
  }
],
});

module.exports = mongoose.model('Recipes', recipeSchema);
