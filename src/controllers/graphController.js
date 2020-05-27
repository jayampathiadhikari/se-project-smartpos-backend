const graphModel = require('../models/graphModel.js');
const reportModel = require('../models/reportModel.js');


class Graph{

  async agentLineGraph(req, res) {

    const result = await graphModel.getAgentLineGraph(req);
    if (result.success) {
      const current_year =new Date().getFullYear();
      const current_month =new Date().getMonth()+1;
      // console.log(typeof current_year);
      // console.log(current_month);

      var rev_array=[]
      var month_array=[]
      var i;
      var obj;
      var month;

      for (i = current_month-1; i > 0; i--) {
          var total_revenue=0
          for (obj of result.data) {
            if (obj.year==current_year && obj.month==i){
                total_revenue+=obj.revenue
              }
            }
          rev_array.push(total_revenue);
          month = await module.exports.getMonthName(i);
          month_array.push(month);
        }

        for (i = 12; i >= current_month; i--) {
          var total_revenue=0
            for (obj of result.data) {
              if (obj.year==current_year-1 && obj.month==i){
                  total_revenue+=obj.revenue
          }
        }
        rev_array.push(total_revenue);
        month = await module.exports.getMonthName(i);
        month_array.push(month);
          }
          return res.status(200).send({
              success: result.success,
              data:[rev_array,month_array]
            });


  }

  else {
      return res.status(200).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }
  }


  async ownerLineGraph(req, res) {

    const result = await graphModel.getOwnerLineGraph(req);
    if (result.success) {
      const current_year =new Date().getFullYear();
      const current_month =new Date().getMonth()+1;

      var rev_array=[]
      var month_array=[]
      var i;
      var obj;
      var month;

      for (i = current_month-1; i > 0; i--) {
          var total_revenue=0
          for (obj of result.data) {
            if (obj.year==current_year && obj.month==i){
                total_revenue+=obj.revenue
              }
            }
          rev_array.push(total_revenue);
          month = await module.exports.getMonthName(i);
          month_array.push(month);
        }

        for (i = 12; i >= current_month; i--) {
          var total_revenue=0
            for (obj of result.data) {
              if (obj.year==current_year-1 && obj.month==i){
                  total_revenue+=obj.revenue
          }
        }
        rev_array.push(total_revenue);
        month = await module.exports.getMonthName(i);
        month_array.push(month);
          }
          return res.status(200).send({
              success: result.success,
              data:[rev_array,month_array]
            });


  }

  else {
      return res.status(200).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }
  }


async agentBarGraph(req,res){

  const result = await graphModel.getAgentBarGraph(req);

  if (result.success) {

    const current_year =new Date().getFullYear();
    const current_month =new Date().getMonth()+1;

    var qua_array=[]
    var month_array=[]
    var i;
    var obj;
    var month;

    for (i = current_month-1; i > 0; i--) {
        var total_quantity=0
        for (obj of result.data) {
          if (obj.year==current_year && obj.month==i){
              total_quantity+=obj.quantity
            }
          }
        qua_array.push(total_quantity);
        month = await module.exports.getMonthName(i);
        month_array.push(month);
      }

      for (i = 12; i >= current_month; i--) {
        var total_quantity=0
          for (obj of result.data) {
            if (obj.year==current_year-1 && obj.month==i){
                total_quantity+=obj.quantity
        }
      }
      qua_array.push(total_quantity);
      month = await module.exports.getMonthName(i);
      month_array.push(month);
        }
        return res.status(200).send({
            success: result.success,
            data:[qua_array,month_array]
          });


    } else {
    return res.status(200).send({
      success: result.success,
      errorType: result.errorType,
      error: result.error
    });
  }
}

async ownerBarGraph(req,res){

  const result = await graphModel.getOwnerBarGraph(req);

  if (result.success) {

    const current_year =new Date().getFullYear();
    const current_month =new Date().getMonth()+1;

    var qua_array=[]
    var month_array=[]
    var i;
    var obj;
    var month;

    for (i = current_month-1; i > 0; i--) {
        var total_quantity=0
        for (obj of result.data) {
          if (obj.year==current_year && obj.month==i){
              total_quantity+=obj.quantity
            }
          }
        qua_array.push(total_quantity);
        month = await module.exports.getMonthName(i);
        month_array.push(month);
      }

      for (i = 12; i >= current_month; i--) {
        var total_quantity=0
          for (obj of result.data) {
            if (obj.year==current_year-1 && obj.month==i){
                total_quantity+=obj.quantity
        }
      }
      qua_array.push(total_quantity);
      month = await module.exports.getMonthName(i);
      month_array.push(month);
        }
        return res.status(200).send({
            success: result.success,
            data:[qua_array,month_array]
          });

  } else {
    return res.status(200).send({
      success: result.success,
      errorType: result.errorType,
      error: result.error
    });
  }
}



async getMonthName(i){
  var month;
  if (i==1){
    month="Jan"
  }
  if (i==2){
    month="Feb"
  }
  if (i==3){
    month="March"
  }
  if (i==4){
    month="April"
  }
  if (i==5){
    month="May"
  }
  if (i==6){
    month="Jun"
  }
  if (i==7){
    month="Jul"
  }
  if (i==8){
    month="Aug"
  }
  if (i==9){
    month="Sep"
  }
  if (i==10){
    month="Oct"
  }
  if (i==11){
    month="Nov"
  }
  if (i==12){
    month="Dec"
  }
  return month
}

async districtsMonthGraph(req, res) {

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

    return res.status(200).send({
      success:result.success,
      data:array
    })

  } else {
    return res.status(200).send({
      success: result.success,
      errorType: result.errorType,
      error: result.error
    });
  }
}

async districtsYearGraph(req, res) {

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

    return res.status(200).send({
      success:result.success,
      data:array
    })

  } else {
    return res.status(200).send({
      success: result.success,
      errorType: result.errorType,
      error: result.error
    });
  }
}

async districtsMonthBarGraph(req, res) {

  const result = await graphModel.getDistrictBarGraph(req);

  var id;
  var obj;
  var array=[];

  if (result.success) {

    const current_month =new Date().getMonth()+1;
    const current_year =new Date().getFullYear();

    for(id=1; id<=25; id++){
      var total_quantity=0;
      var name;
      for(obj of result.data){
          if (obj.month==current_month-1 && obj.year==current_year && obj.district_id==id){
            total_quantity+=obj.quantity;
          }
      }
      var result2 = await reportModel.getDistrictName(id);
      name = result2.data[0].district_name;
      array.push({district_name:name,total_quantity:total_quantity});

    }

    return res.status(200).send({
      success:result.success,
      data:array
    })

  } else {
    return res.status(200).send({
      success: result.success,
      errorType: result.errorType,
      error: result.error
    });
  }
}

async districtsYearBarGraph(req, res) {

  const result = await graphModel.getDistrictBarGraph(req);

  var id;
  var obj;
  var array=[];

  if (result.success) {

    const current_year =new Date().getFullYear();

    for(id=1; id<=25; id++){
      var total_quantity=0;
      var name;
      for(obj of result.data){
          if (obj.year==current_year-1 && obj.district_id==id){
            total_quantity+=obj.quantity;
          }
      }
      var result2 = await reportModel.getDistrictName(id);
      name = result2.data[0].district_name;
      array.push({district_name:name,total_quantity:total_quantity});

    }

    return res.status(200).send({
      success:result.success,
      data:array
    })

  } else {
    return res.status(200).send({
      success: result.success,
      errorType: result.errorType,
      error: result.error
    });
  }
}



}
  const graph = new Graph();
  module.exports = graph;
