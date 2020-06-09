const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app.js');

//assertion style
chai.should();

chai.use(chaiHttp);

describe('Shop',()=>{

  describe('view agent shops',function (){
    this.timeout(5000);

    it('it should return all shops of that agent', (done)=> {


      chai.request(app)
        .get('/api/v1/shop/viewagentshops')
        .query({district_id:3})
        .end((err,res)=>{
          //console.log(res.body);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.all.keys('success','data');
          for (obj in res.body.data){
            res.body.data[obj].district_id.should.equal(3);
            }
          done();
        })
    })

    it('it should not return shops when district id in invalid', (done)=> {

      let request ={
        district_id:'hjdjje'
      }

      chai.request(app)
        .get('/api/v1/shop/viewagentshops')
        .end((err,res)=>{
          //console.log(res.body);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.all.keys('success','errorType','error');
          res.body.success.should.equal(false);
          res.body.errorType.should.equal('query error')
          done();
        })
    })

  })





})
