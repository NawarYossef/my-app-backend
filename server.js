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

app.get("/", (req, res)  => {
  res.send({"hello":"world"});
});


// Save
app.post("/save", async (req, res, err) => {
  const newPerson = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  }
  try {
    await Person.create(newPerson);
    res.status(201).json(person);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update
app.put("/update/:id", async (req, res, err) => {
  const queryId = req.params.id;
  let resData;
  
  try {
    await Person.findById(req.params.id, function (e, doc) {
      if (e) {
        return new Error;
      }
      doc.firstName = req.body.firstName
      doc.lastName = req.body.lastName
      doc.save();
    })

    await Person.find({firstName:req.body.firstName}, function(e, doc) {
      if (e) {
        return new Error;
      }
      resData = doc;
    })
    res.status(201).json(resData);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

// DELETE
app.put("/delete/:id", async (req, res, err) => {
  const queryId = req.params.id;
  
  try {
    const removedPerson = await Person.findByIdAndDelete(req.params.id)

    if (!removedPerson) {
      res.status(404).send("No item found")
    };
    res.status(200).send();
  } catch (e) {
    res.status(500).send(e)
  }
});

