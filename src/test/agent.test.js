// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const app = require('../../app.js');
//
// //assertion style
// chai.should();
//
// chai.use(chaiHttp);
//
// describe('Agent',()=>{
//
//   describe('suggest shops',()=>{
//     this.timeout(5000);
//
//     it('it should return the suggestion',(done)=>{
//
//       let request =    {
// 	         name:"K.D.Y.Storrres",
// 	          route_id: 3,
// 	           latitude:12.5632000,
// 	            longitude: 4.5645200,
// 	             shop_contact_num: "011-2347678",
// 	              name_with_initial:"P.Sooma",
// 	               contact_num_cell:"071-4568402",
// 	                contact_num_land:"045-5238990",
// 	                 residence_lattitude:679.4964234,
// 	                  residence_longitude:788.3434960,
// 	                   email:"kdrty@gmail.com"
//                    }
//
//       chai.request(app)
//         .post('/api/v1/agent/suggest')
//         .set('content-type', 'application/json')
//         .send(request)
//         .end((err,res)=>{
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           done();
//     })
//   })
//
//
//   it('should be not return the suggestion',(done)=>{
//
//     let request =    {
//          //find how it should be rejected
//                  }
//
//     chai.request(app)
//       .post('/api/v1/agent/suggest')
//       .set('content-type', 'application/json')
//       .send(request)
//       .end((err,res)=>{
//         res.should.have.status(404);
//         done();
//   })
// })
//
//
// })
//
//
// describe('view sales data',()=>{
//   this.timeout(5000);
//
//   it('it should return sales dates',(done)=>{
//
//     let request =   {
//         agent_id://add a valid ID
//                  }
//
//     chai.request(app)
//       .get('/api/v1/agent/viewsalesdates')
//       .set('content-type', 'application/json')
//       .send(request)
//       .end((err,res)=>{
//         res.should.have.status(200);
//         res.body.should.be.a('object');
//         done();
//   })
// })
//
//
// it('should be not return salesdates',(done)=>{
//
//   let request =    {
//        agent_id://find how it should be rejected 1. invalid agent id
//                }
//
//   chai.request(app)
//     .get('/api/v1/agent/viewsalesdates')
//     .set('content-type', 'application/json')
//     .send(request)
//     .end((err,res)=>{
//       res.should.have.status(404);
//       done();
// })
// })
//
//
// })
//
//
//
//
// })
