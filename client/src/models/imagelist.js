const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ImageListSchema = new Schema({
  img_src: { type: String, required: true }
});


// Export model
module.exports = mongoose.model("Imagelist", ImageListSchema);