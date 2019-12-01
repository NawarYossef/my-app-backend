const express = require("express");
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const app = express();

chai.use(chaiHttp);

describe('Person', () => {
  /*
  * Test the /GET route
  */
  describe('/GET users', () => {
      it('it should GET all the users', (done) => {
        try {
          chai.request(app)
            .get('/')
            .then((res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.length.should.be.eql(0);
          })
        } catch(e) {
            console.log('------------------------------------');
            console.log(e);
            console.log('------------------------------------');
          }
          done();
      });
  });
});