let mongoose = require('mongoose')

let personSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    unique: false,
  },
  lastName: {
    type: String,
    required: true,
    unique: false,
  }
})

const Person = mongoose.model('Person', personSchema);

module.exports = {
  Person
}