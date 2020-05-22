const graphModel = require('../models/graphModel.js');


class Graph{

  async agentLineGraph(req, res) {

    const result = await graphModel.insertSuggestions(req);
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

}
  const graph = new Graph();
  module.exports = graph;
