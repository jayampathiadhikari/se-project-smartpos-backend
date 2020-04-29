const { getData} = require('../db/index');
const {deleteData} = require('../db/index');
const {getData_twoConditions} = require('../db/index');
const {updateSingleData} = require('../db/index');


exports.getSuggestedList = async (req) => {
  console.log('de')
    const result = await getData_twoConditions('requesting_invoice_items', ['employee_id','state_accepted'], [req.body.employee_id,'false']);
    return result;
}


exports.removeSuggestion = async (req) => {
  console.log('de')
    const result = await deleteData('requesting_invoice_items', ['requesting_invoice_items_id'], req.body.requesting_invoice_items_id);
    return result;
}

exports.acceptRequest = async (req) => {
  console.log('de')
    const result = await updateSingleData('requesting_invoice_items', 'state_accepted','true','requesting_invoice_items_id',req.body.requesting_invoice_items_id);
    return result;
}

exports.getAcceptedList = async (req) => {
  console.log('de')
    const result = await getData_twoConditions('requesting_invoice_items', ['employee_id','state_accepted'], [req.body.employee_id,'true']);
    return result;
}
