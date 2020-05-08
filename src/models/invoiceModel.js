const {getData} = require('../db/index');
const {updateSingleData} = require('../db/index');

exports.getAllInvoices = async (shop_id) => {

    const result = await getData('invoice', 'shop_id',shop_id );
    return result;
}

exports.getInvoiceDetails = async (invoice_id)=>{
    const result = await getData('invoice_items natural join product', 'invoice_id',invoice_id );
    return result;
}


exports.updateInvoicePaidAmount = async (invoice_id,paid_amount)=>{
    const result = await updateSingleData('invoice', 'paid_amount',paid_amount, 'invoice_id', invoice_id);
    return result;
}


}

