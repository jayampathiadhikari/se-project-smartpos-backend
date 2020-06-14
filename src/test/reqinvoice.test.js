const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app.js');
const connection = require('../db/postgres.js');
//assertion style
chai.should();

chai.use(chaiHttp);

describe('Reqesting Invoice',()=>{

  describe('view suggested list',function (){

    this.timeout(50000);


    it('it should return all suggestions that agent', (done)=> {


      chai.request(app)
        .get('/api/v1/reqinvoice/viewsuggestedlist')
        .query({employee_id:'vsotjU8PuSUm5HxEmDbJ5zWvbgy2'})
        .end((err,res)=>{
          //console.log(res.body);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.all.keys('success','data');
          for (obj in res.body.data){
            res.body.data[obj].state_accepted.should.equal('false');
          }

          done();
        })
    })

    // it('it should not return suggested list when employee id is invalid', (done)=> {
    //
    //   chai.request(app)
    //     .get('/api/v1/reqinvoice/viewsuggestedlist')
    //     .query({employee_id:'der'})
    //     .end((err,res)=>{
    //       console.log(res.body);
    //       res.should.have.status(200);
    //       res.body.should.be.a('object');
    //       res.body.should.have.all.keys('success','errorType','error');
    //       res.body.success.should.equal(false);
    //       res.body.errorType.should.equal('query error')
    //       done();
    //     })
    // })

  })

  describe('declare suggestion',function (){
    this.timeout(5000);

    var result;
    let id;


    // beforeEach( async function(done) {
    //   // runs once before the first test in this block
    //   this.result = await connection.queryParameterized(`SELECT * from requesting_invoice_items where state_accepted=$1 limit 1`, ['false']);
    //   console.log(this.result);
    //   this.id=this.result.data[0].requesting_invoice_items_id
    //   done();
    //
    // });
    //
    // it('it should declare the suggestion', (done)=> {
    //   console.log(id);
    //   //console.log(this.test.id);
    //
    //   let request ={
    //     requesting_invoice_items_id:this.id
    //   }
    //
    //
    //   chai.request(app)
    //     .post('/api/v1/reqinvoice/declaresuggestion')
    //     .end((err,res)=>{
    //       console.log(res.body);
    //       res.should.have.status(200);
    //       res.body.should.be.a('object');
    //       res.body.should.have.all.keys('success','data');
    //       res.body.should.have.property('data').with.lengthOf(0);
    //       done();
    //     })
    // })
    //


    it('it should not declare the suggestion when id is a string', (done)=> {

      let request ={
        requesting_invoice_items_id:'ANY STRING'
      }

      chai.request(app)
        .post('/api/v1/reqinvoice/declaresuggestion')
        .end((err,res)=>{
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.all.keys('success','errorType','error');
          res.body.success.should.equal(false);
          res.body.errorType.should.equal('query error')

          done();
        })
    })


    // after(function() {
    //   // runs once after the last test in this block
    //   connection.queryParameterized(`insert into requesting_invoice_items(requesting_invoice_items_id,employee_id,product_id,quantity,state_accepted) values ($1,$2,$3,$4,$5)`,[this.result.data[0].requesting_invoice_items_id,this.result.data[0].employee_id,this.result.data[0].product_id,this.result.data[0].quantity,this.result.data[0].state_accepted])
    //
    // });

  })


  describe('view accepted suggestions',function (){
    this.timeout(50000);

    it('it should return accepted suggestions', (done)=> {


      chai.request(app)
        .get('/api/v1/reqinvoice/viewacceptedlist')
        .query({employee_id:'vsotjU8PuSUm5HxEmDbJ5zWvbgy2'})
        .end((err,res)=>{
          //console.log(res.body);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.all.keys('success','data');
          for (obj in res.body.data){
            res.body.data[obj].state_accepted.should.equal('true');
          }

          done();
        })
    })

    // it('it should not return accepted suggestions', (done)=> {
    //
    //
    //   chai.request(app)
    //     .get('/api/v1/reqinvoice/viewacceptedlist')
    //     .query({employee_id:'der'})
    //     .end((err,res)=>{
    //       res.should.have.status(200);
    //       res.body.should.be.a('object');
    //       res.body.should.have.all.keys('success','errorType','error');
    //       res.body.success.should.equal(false);
    //       res.body.errorType.should.equal('query error')
    //       done();
    //     })
    // })

  })

  describe('send request',function (){
    this.timeout(5000);

   var result;


    // before(async function() {
    //   // runs once before the first test in this block
    //   this.result = await connection.queryParameterized(`SELECT * from requesting_invoice_items where state_accepted=$1 limit 1`, ['false']);
    //   //console.log(this.result);
    //   global.re_id=this.result.data[0].requesting_invoice_items_id
    //
    // });
    //
    // it('it should send the suggestion', (done)=> {
    //   let request ={
    //     requesting_invoice_items_id:re_id
    //   }
    //
    //
    //   chai.request(app)
    //     .post('/api/v1/reqinvoice/sendrequest')
    //     .end((err,res)=>{
    //       console.log(res.body);
    //       res.should.have.status(200);
    //       res.body.should.be.a('object');
    //       res.body.should.have.all.keys('success','data');
    //       done();
    //     })
    // })

    it('it should not accept the suggestion when id is invalid', (done)=> {

      let request ={
        requesting_invoice_items_id:'any_string'
      }

      chai.request(app)
        .post('/api/v1/reqinvoice/sendrequest')
        .end((err,res)=>{
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.all.keys('success','errorType','error');
          res.body.success.should.equal(false);
          res.body.errorType.should.equal('query error')

          done();
        })
    })

    // after(function() {
    //   // runs once after the last test in this block
    //   connection.queryParameterized(`insert into requesting_invoice_items(requesting_invoice_items_id,employee_id,product_id,quantity,state_accepted) values ($1,$2,$3,$4,$5)`,[this.result.data[0].requesting_invoice_items_id,this.result.data[0].employee_id,this.result.data[0].product_id,this.result.data[0].quantity,this.result.data[0].state_accepted])
    //
    // });

  })




})
