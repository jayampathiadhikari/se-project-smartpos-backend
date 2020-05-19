const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app.js');
const connection = require('../db/postgres.js');

//assertion style
chai.should();

chai.use(chaiHttp);

describe('Owner',()=>{

  describe('view shop suggestions',function (){
    this.timeout(50000);

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
  //     let request={
  //       shop_suggestion_id:1
  //     }
  //
  //     chai.request(app)
  //       .post('/api/v1/owner/acceptsuggestion')
  //       .send(request)
  //       .end((err,res)=>{
  //         //res.should.have.status(200);
  //         res.body.should.be.a('string');
  //         //res.body.length.should.be.eq(2);
  //         done();
  //       })
  //   })
  //
  //   // it('it should not do a transaction', (done)=> {
  //   //
  //   //   let request={
  //   //     shop_suggestion_id:"any_string"
  //   //   }
  //   //
  //   //   chai.request(app)
  //   //     .post('/api/v1/owner/acceptsuggestion')
  //   //     .send(request)
  //   //     .end((err,res)=>{
  //   //       res.should.have.status(404);
  //   //       done();
  //   //     })
  //   // })
  //
  // })
  //

  // describe('decline shop suggestion',function (){
  //   this.timeout(50000);
  //
  //   let request={
  //     shop_suggestion_id:2
  //   }
  //
  //   describe('test positive case',function(){
  //
  //
  //     before(async function() {
  //     // runs once before the first test in this block
  //     const result = await connection.queryParameterized(`SELECT * from shop_suggestions where shop_suggestion_id=$1`, [request.shop_suggestion_id]);
  //
  //
  //   });
  //
  //
  //     it('it should delete a record', (done)=> {
  //
  //
  //       chai.request(app)
  //         .post('/api/v1/owner/declinesuggestion')
  //         .send(request)
  //         .end((err,res)=>{
  //           res.should.have.status(200);
  //           res.body.should.be.a('object');
  //           //res.body.length.should.be.eq(2);
  //           done();
  //         })
  //     })
  //
  //     after(function() {
  //       // runs once after the last test in this block
  //       connection.queryParameterized(`INSERT INTO shop_suggestions(shop_suggestion_id,route_id,name,latitude,longitude,shop_contact_num,name_with_initial,) VALUES(2) RETURNING *`, [new Date().getFullYear(),new Date().getMonth()+1])
  //
  //     });
  //
  //
  //
  //
  //   })



    // it('it should not delete a record', (done)=> {
    //
    //   let request={
    //     shop_suggestion_id:"any_string"
    //   }
    //
    //   chai.request(app)
    //     .post('/api/v1/owner/declinesuggestion')
    //     .send(request)
    //     .end((err,res)=>{
    //       res.should.have.status(404);
    //       done();
    //     })
    // })

  //})


  describe('view agents',function (){
    this.timeout(5000);

    it('it should return all agents', (done)=> {


      chai.request(app)
        .get('/api/v1/owner/viewagents')
        .end((err,res)=>{
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.all.keys('success','data');
          for (obj in res.body.data){
            //console.log(obj);
            res.body.data[obj].role_id.should.equal(1);
            res.body.data[obj].role_name.should.equal('agent');

          }

          done();
        })
    })


  })


  describe('send target',function (){

    before(function() {
    // runs once before the first test in this block
    connection.queryParameterized(`Delete from monthly_target where (year=$1 and month=$2)`, [new Date().getFullYear(),new Date().getMonth()+1])

  });

    this.timeout(50000);

    it('it should add the target to the table', (done)=> {

      let request={
        target_value:50000
      }

      chai.request(app)
        .post('/api/v1/owner/sendtarget')
        .send(request)
        .end((err,res)=>{
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.all.keys('success','data');
          res.body.should.have.property('data').with.lengthOf(1);
          res.body.data[0].target_value.should.equal(request.target_value)
          done();
        })
    })

    it('it should not add a target when target is not an integer', (done)=> {

      let request={
        target_value:"any_string"
      }

      chai.request(app)
        .post('/api/v1/owner/sendtarget')
        .send(request)
        .end((err,res)=>{
          res.should.have.status(404);
          done();
        })
    })


  })





})
