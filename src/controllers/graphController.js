const graphModel = require('../models/graphModel.js');


class Graph{

  async agentLineGraph(req, res) {

    // const result = await graphModel.getAgentLineGraph(req);
    // if (result.success) {
    //   const current_year =;
    //   const current_month =;
    //   let months=[]
    //   for i in range(1,current_month){
    //
    //   }
    //   return res.status(200).send(result)
    //
    // } else {
    //   return res.status(404).send({
    //     success: result.success,
    //     errorType: result.errorType,
    //     error: result.error
    //   });
    // }
  }

}
  const graph = new Graph();
  module.exports = graph;
