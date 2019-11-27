let mongoose = require('mongoose')

let personSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    unique: true,
  },
  lastName: {
    type: String,
    required: true,
    unique: true,
  }
})

const Person = mongoose.model('Person', personSchema);

module.exports = {
  Person
}