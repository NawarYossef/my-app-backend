const mongoose = require("mongoose");
const express = require("express");
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();

const { PORT, DATABASE_URL } = require("./config");
const { Person } = require("./databse/collections/person/schema.js");

const connectDb = () => mongoose.connect(DATABASE_URL, {dbName: 'my-db'});

app.use(morgan('common'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

 connectDb().then(async () => {
  app.listen(PORT, () =>
    console.log(`Example app listening on port ${PORT}!`),
  );
});

app.get("/", async (req, res, e)  => {
  try {

  } catch(e) {
    res.status(404).send(e);
  }
  const allUsers = await Person.find();
  res.send(allUsers);
});


// Save
app.post("/save", async (req, res, e) => {
  const newPersonData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  }
  try {
    await Person.create(newPersonData)
    .then(personCreated => {
      res.status(201).json(personCreated);
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

// Update
app.put("/update/:id", async (req, res, err) => {
  const queryId = req.params.id;
  let resData;
  
  try {
    await Person.findById(req.params.id)
    .then((doc) => {
      if (!doc) {
        throw 'User not found';
      }
      doc.firstName = req.body.firstName
      doc.lastName = req.body.lastName
      doc.save();
      resData = doc;
    })
    res.status(201).json(resData);
  } catch (e) {
    res.status(500).send(e);
  }
});

// DELETE
app.put("/delete/:id", async (req, res, err) => {
  const queryId = req.params.id;
  let removedPerson;
  try {
    removedPerson = await Person.findByIdAndDelete(req.params.id)

    if (!removedPerson) {
      throw 'User not found'
    };

    res.status(201).json(removedPerson);
  } catch (e) {
    res.status(500).send(e)
  }
});

