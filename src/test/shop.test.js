// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const app = require('../../app.js');
//
// //assertion style
// chai.should();
//
// chai.use(chaiHttp);
//
// describe('Shop',()=>{
//
//   describe('view agent shops',function (){
//     this.timeout(5000);
//
//     it('it should return all shops of that agent', (done)=> {
//       let request ={
//         district_id://put  a valid id
//       }
//
//
//       chai.request(app)
//         .get('/api/v1/shop/viewagentshops')
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
//         district_id://find something wrong
//       }
//
//       chai.request(app)
//         .get('/api/v1/shop/viewagentshops')
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
//
// })
