// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const app = require('../../app.js');
//
// //assertion style
// chai.should();
//
// chai.use(chaiHttp);
//
// describe('agent Controller Testing',()=>{
//
//   describe('suggest shops',()=>{
//
//     it('should be a object',(done)=>{
//
//       const shop =    {
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
//         .send(shop)
//         .end((err,res)=>{
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           done();
//     })
//   })
//
//
// })
//
//
//
//
// })
