const mongoose = require("mongoose");
const express = require("express");
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const { PORT, DATABASE_URL } = require("./config");
const { Person } = require("./databse/collections/person/schema.js");

const connectDb = () => {
  return mongoose.connect(DATABASE_URL);
}

app.use(morgan('common'));
app.use(cors());

 connectDb().then(async () => {
  app.listen(PORT, () =>
    console.log(`Example app listening on port ${PORT}!`),
  );
});

app.get("/", function (req, res) {
  res.send({"hello":"world"});
});


app.post("/", function (req, res) {
  const newPerson = {
    firstName: 'John',
    lastName: 'Doe'
  }
  Person.create(newPerson)
  console.log(Person, 'person collection');

  res.send(Person);
});

