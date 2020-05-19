const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app.js');

//assertion style
chai.should();

chai.use(chaiHttp);

describe('Owner',()=>{

  describe('view shop suggestions',function (){
    this.timeout(5000);

    it('it should return all shop suggestions', (done)=> {

      chai.request(app)
        .get('/api/v1/owner/viewsuggestion')
        .end((err,res)=>{
          res.should.have.status(200);
          res.body.should.be.a('object');
          //res.body.length.should.be.eq(2);
          done();
        })
    })

  })


  // describe('accept shop suggestions',function (){
  //   this.timeout(5000);
  //
  //   it('it should do a transaction', (done)=> {
  //
  //     chai.request(app)
  //       .get('/api/v1/owner/acceptsuggestion')
  //       .send()
  //       .end((err,res)=>{
  //         res.should.have.status(200);
  //         res.body.should.be.a('object');
  //         //res.body.length.should.be.eq(2);
  //         done();
  //       })
  //   })
  //
  // })
})
