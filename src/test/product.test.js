//
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const app = require('../../app.js');
//
// //assertion style
// chai.should();
//
// chai.use(chaiHttp);
//
// describe('Product',()=>{
//   this.timeout(5000);
//
//   describe('send to agent',()=>{
//
//
//     it('it should send products to carriage', (done)=> {
//
//       let request={
//         agent_id:,
//         product_id:,
//         quantity:
//
//       }
//
//       chai.request(app)
//         .post('/api/v1/product/sendtoagent')
//         .send(request)
//         .end((err,res)=>{
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           //res.body.length.should.be.eq(2);
//           done();
//         })
//     })
//
//     it('it should not send products to carriage', (done)=> {
//
//       let request={
//         agent_id:,
//         product_id:,
//         quantity:
//
//       }
//
//       chai.request(app)
//         .post('/api/v1/product/sendtoagent')
//         .send(request)
//         .end((err,res)=>{
//           res.should.have.status(404);
//           done();
//         })
//     })
//
//
//
//
//   })
//
//   describe('add new product',()=>{
//
//
//     it('it should add new products', (done)=> {
//
//       let request={
//
//
//       }
//
//       chai.request(app)
//         .post('api/v1/product/addnewproduct')
//         .send(request)
//         .end((err,res)=>{
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           //res.body.length.should.be.eq(2);
//           done();
//         })
//     })
//
//     it('it should not add new products', (done)=> {
//
//       let request={
//
//       }
//
//       chai.request(app)
//         .post('/api/v1/product/addnewproduct')
//         .send(request)
//         .end((err,res)=>{
//           res.should.have.status(404);
//           done();
//         })
//     })
//
//
//
//
//   })
//
//
//   describe('add items',()=>{
//
//
//     it('it should add items to warehouse', (done)=> {
//
//       let request={
//         product_id:,
//         quantity:
//
//       }
//
//       chai.request(app)
//         .post('api/v1/product/additems')
//         .send(request)
//         .end((err,res)=>{
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           //res.body.length.should.be.eq(2);
//           done();
//         })
//     })
//
//     it('it should not add items to warehouse', (done)=> {
//
//       let request={
//         product_id:,
//         quantity:
//
//       }
//
//       chai.request(app)
//         .post('/api/v1/product/additems')
//         .send(request)
//         .end((err,res)=>{
//           res.should.have.status(404);
//           done();
//         })
//     })
//
//
//
//
//   })
//
// })
