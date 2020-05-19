// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const app = require('../../app.js');
//
// //assertion style
// chai.should();
//
// chai.use(chaiHttp);
//
// describe('Reqesting Invoice',()=>{
//
//   describe('view suggested list',function (){
//     this.timeout(5000);
//
//     it('it should return all suggestions that agent', (done)=> {
//       let request ={
//         employee_id://put  a valid id
//       }
//
//
//       chai.request(app)
//         .get('/api/v1/reqinvoice/viewsuggestedlist')
//         .end((err,res)=>{
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           //res.body.length.should.be.eq(2);
//           done();
//         })
//     })
//
//     it('it should not return all shops of that agent', (done)=> {
//
//       let request ={
//         employee_id://find something wrong
//       }
//
//       chai.request(app)
//         .get('/api/v1/reqinvoice/viewsuggestedlist')
//         .end((err,res)=>{
//           res.should.have.status(404);
//           done();
//         })
//     })
//
//   })
//
//   describe('declare suggestion',function (){
//     this.timeout(5000);
//
//     it('it should declare the suggestion', (done)=> {
//       let request ={
//         requesting_invoice_items_id://put  a valid id
//       }
//
//
//       chai.request(app)
//         .post('/api/v1/reqinvoice/declaresuggestion')
//         .end((err,res)=>{
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           //res.body.length.should.be.eq(2);
//           done();
//         })
//     })
//
//     it('it should not declare the suggestion', (done)=> {
//
//       let request ={
//         requesting_invoice_items_id://find something wrong
//       }
//
//       chai.request(app)
//         .post('/api/v1/reqinvoice/declaresuggestion')
//         .end((err,res)=>{
//           res.should.have.status(404);
//           done();
//         })
//     })
//
//   })
//
//
//   describe('view accepted suggestions',function (){
//     this.timeout(5000);
//
//     it('it should return accepted suggestions', (done)=> {
//       let request ={
//         employee_id://put  a valid id
//       }
//
//
//       chai.request(app)
//         .get('/api/v1/reqinvoice/viewacceptedlist')
//         .end((err,res)=>{
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           //res.body.length.should.be.eq(2);
//           done();
//         })
//     })
//
//     it('it should not return accepted suggestions', (done)=> {
//
//       let request ={
//         employee_id://find something wrong
//       }
//
//       chai.request(app)
//         .get('/api/v1/reqinvoice/viewacceptedlist')
//         .end((err,res)=>{
//           res.should.have.status(404);
//           done();
//         })
//     })
//
//   })
//
//   describe('send request',function (){
//     this.timeout(5000);
//
//     it('it should send the suggestion', (done)=> {
//       let request ={
//         requesting_invoice_items_id://put  a valid id
//       }
//
//
//       chai.request(app)
//         .post('/api/v1/reqinvoice/sendrequest')
//         .end((err,res)=>{
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           //res.body.length.should.be.eq(2);
//           done();
//         })
//     })
//
//     it('it should not send the suggestion', (done)=> {
//
//       let request ={
//         requesting_invoice_items_id://find something wrong
//       }
//
//       chai.request(app)
//         .post('/api/v1/reqinvoice/sendrequest')
//         .end((err,res)=>{
//           res.should.have.status(404);
//           done();
//         })
//     })
//
//   })
//
//
//
//
// })
