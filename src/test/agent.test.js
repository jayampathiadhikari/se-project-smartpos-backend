const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app.js');
const connection = require('../db/postgres.js');

//assertion style
chai.should();

chai.use(chaiHttp);

describe('Agent',()=>{

  describe('suggest shops',function(){
    this.timeout(50000);



    it('it should insert the suggestion',(done)=>{

       global.request = {
	         name:"Poo Stores",
	          route_id: 3,
            district_id:6,
	           latitude:"12.5632000",
	            longitude: "4.5645200",
	             shop_contact_num: "011-2347678",
	              name_with_initial:"R.Pooja",
	               contact_num_cell:"071-4568402",
	                contact_num_land:"045-5238990",
	                 residence_lattitude:"679.4964234",
	                  residence_longitude:"788.3434960",
	                   email:"poo@gmail.com"
                   }

      chai.request(app)
        .post('/api/v1/agent/suggest')
        .set('content-type', 'application/json')
        .send(request)
        .end((err,res)=>{
          //console.log(res.body);
          this.token= res.body.data[0]
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.all.keys('success','data');
          res.body.should.have.property('data').with.lengthOf(1);
          res.body.data[0].name.should.equal(request.name)
          res.body.data[0].route_id.should.equal(request.route_id)
          res.body.data[0].longitude.should.equal(request.longitude)
          res.body.data[0].latitude.should.equal(request.latitude)
          res.body.data[0].contact_num_cell.should.equal(request.contact_num_cell)
          res.body.data[0].contact_num_land.should.equal(request.contact_num_land)
          res.body.data[0].shop_contact_num.should.equal(request.shop_contact_num)
          res.body.data[0].name_with_initial.should.equal(request.name_with_initial)
          res.body.data[0].residence_longitude.should.equal(request.residence_longitude)
          res.body.data[0].residence_lattitude.should.equal(request.residence_lattitude)
          res.body.data[0].email.should.equal(request.email)

          done();
    })



  })

  after(function() {
    // runs once after the last test in this block
    connection.queryParameterized(`Delete from shop_suggestions where name=$1`,[request.name])

  });



  it('should not return the suggestion when some are null',(done)=>{

    let request =    {

       route_id: 3,
        latitude:"12.5632000",
         longitude: "4.5645200",
           name_with_initial:"R.Jay",
            contact_num_cell:"071-4568402",
             contact_num_land:"045-5238990",
              residence_lattitude:"679.4964234",
               residence_longitude:"788.3434960",
                email:"jay@gmail.com"

                 }

    chai.request(app)
      .post('/api/v1/agent/suggest')
      .set('content-type', 'application/json')
      .send(request)
      .end((err,res)=>{
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.all.keys('success','errorType','error');
        res.body.success.should.equal(false);
        res.body.errorType.should.equal('query error')
        done();
  })
})


})


// describe('view sales data',function(){
//   this.timeout(5000);
//
//   it('it should return sales dates',(done)=>{
//
//     let request =   {
//         agent_id:"vsotjU8PuSUm5HxEmDbJ5zWvbgy2"
//                  }
//
//     chai.request(app)
//       .get('/api/v1/agent/viewsalesdates')
//       .set('content-type', 'application/json')
//       .query(request)
//       .end((err,res)=>{
//         res.should.have.status(200);
//         res.body.should.be.a('object');
//         res.body.should.have.all.keys('success','data');
//         for (obj in res.body.data){
//           res.body.data[obj].should.have.property('sold_date');
//         }
//         done();
//   })
// })
//
//
// // it('should be not return salesdates when id is not found',(done)=>{
// //
// //   let request =    {
// //        agent_id:1234
// //                }
// //
// //   chai.request(app)
// //     .get('/api/v1/agent/viewsalesdates')
// //     .set('content-type', 'application/json')
// //     .query(request)
// //     .end((err,res)=>{
// //       res.should.have.status(404);
// //       done();
// // })
// // })
//
//
// })




})
