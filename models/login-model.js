const mongoose = require("mongoose");
const loginschema = mongoose.Schema({
  Firstname: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
    minlength: 3,
  },
  token: {
    type: String,
  }
});
module.exports = mongoose.model("login", loginschema);
