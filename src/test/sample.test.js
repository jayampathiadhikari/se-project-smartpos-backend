
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app.js');

//assertion style
chai.should();

chai.use(chaiHttp);

describe('Sample',()=>{

  describe('sample',()=>{


    it('it should responds with json', (done)=> {
      chai.request(app)
        .get('/sample')
        .end((err,res)=>{
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eq(2);
          done();
        })
    })



    // it('it should responds with json', (done)=> {
    //   chai.request(app)
    //     .get('/')
    //     .end((err,res)=>{
    //       res.should.have.status(200);
    //       res.body.should.be.a('object');
    //       // res.body.length.should.be.eq(3);
    //       done();
    //     })
    // })
  })
})
