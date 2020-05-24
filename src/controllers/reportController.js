const reportModel = require('../models/reportModel.js');
const graphModel = require('../models/graphModel.js');
const productController = require('../controllers/productController.js');

class Report{

  async viewReport(req, res) {

    const result = await reportModel.getReportDetails(req);

    if (result.success) {
      //res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
      return res.status(200).send(result)
    } else {
      return res.status(404).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }
  }



  async viewTopProductsMonthOwner(req, res) {

    const result = await graphModel.getOwnerLineGraph(req);
    const result2 = await productController.allProductIds(req);

    var ids=[]
    if (result2.success){
      ids=result2.data
    }

    //console.log(ids);
    var id;
    var obj;
    var array=[];

    if (result.success) {

      const current_month =new Date().getMonth()+1;
      const current_year =new Date().getFullYear();

      for(id of ids){
        var total_revenue=0;
        for(obj of result.data){
            if (obj.month==current_month-1 && obj.year==current_year && obj.product_id==id){
              total_revenue+=obj.revenue;
            }
        }
        array.push({id:id,total_revenue:total_revenue});

      }

      array.sort(function compare(a, b) {

          const revA = a.total_revenue;
          const revB = b.total_revenue;

          let comparison = 0;
          if (revA > revB) {
            comparison = 1;
          } else if (revA < revB) {
            comparison = -1;
          }
          return comparison;
      });

      array.reverse();



      return res.status(200).send({
        success:result.success,
        data:array
      })

    } else {
      return res.status(404).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }
  }


  async viewTopProductsYearOwner(req, res) {

    const result = await graphModel.getOwnerLineGraph(req);
    const result2 = await productController.allProductIds(req);

    var ids=[]
    if (result2.success){
      ids=result2.data
    }

    //console.log(ids);
    var id;
    var obj;
    var array=[];

    if (result.success) {

      const current_year =new Date().getFullYear();

      for(id of ids){
        var total_revenue=0;
        for(obj of result.data){
            if (obj.year==current_year-1 && obj.product_id==id){
              total_revenue+=obj.revenue;
            }
        }
        array.push({id:id,total_revenue:total_revenue});

      }

      array.sort(function compare(a, b) {

          const revA = a.total_revenue;
          const revB = b.total_revenue;

          let comparison = 0;
          if (revA > revB) {
            comparison = 1;
          } else if (revA < revB) {
            comparison = -1;
          }
          return comparison;
      });

      array.reverse();



      return res.status(200).send({
        success:result.success,
        data:array
      })

    } else {
      return res.status(404).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }
  }

  async viewTopDistrictsMonth(req, res) {

    const result = await reportModel.getAllDistrictSales(req);

    var id;
    var obj;
    var array=[];

    if (result.success) {

      const current_month =new Date().getMonth()+1;
      const current_year =new Date().getFullYear();

      for(id=1; id<=25; id++){
        var total_revenue=0;
        var name;
        for(obj of result.data){
            if (obj.month==current_month-1 && obj.year==current_year && obj.district_id==id){
              total_revenue+=obj.revenue;
            }
        }
        var result2 = await reportModel.getDistrictName(id);
        name = result2.data[0].district_name;
        array.push({district_name:name,total_revenue:total_revenue});

      }

      array.sort(function compare(a, b) {

          const revA = a.total_revenue;
          const revB = b.total_revenue;

          let comparison = 0;
          if (revA > revB) {
            comparison = 1;
          } else if (revA < revB) {
            comparison = -1;
          }
          return comparison;
      });

      array.reverse();



      return res.status(200).send({
        success:result.success,
        data:array
      })

    } else {
      return res.status(404).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }
  }

  async viewTopDistrictsYear(req, res) {

    const result = await reportModel.getAllDistrictSales(req);

    var id;
    var obj;
    var array=[];

    if (result.success) {

      const current_year =new Date().getFullYear();

      for(id=1; id<=25; id++){
        var total_revenue=0;
        var name;
        for(obj of result.data){
            if (obj.year==current_year-1 && obj.district_id==id){
              total_revenue+=obj.revenue;
            }
        }
        var result2 = await reportModel.getDistrictName(id);
        name = result2.data[0].district_name;
        array.push({district_name:name,total_revenue:total_revenue});

      }

      array.sort(function compare(a, b) {

          const revA = a.total_revenue;
          const revB = b.total_revenue;

          let comparison = 0;
          if (revA > revB) {
            comparison = 1;
          } else if (revA < revB) {
            comparison = -1;
          }
          return comparison;
      });

      array.reverse();



      return res.status(200).send({
        success:result.success,
        data:array
      })

    } else {
      return res.status(404).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }
  }


}




const report = new Report();
module.exports = report;
