const {getData} = require('../db/index');
const {incrementIntegers} = require('../db/index');
const {insertData} = require('../db/index');
const {deleteData} = require('../db/index');
const connection = require('../db/postgres');

exports.getAllInvoices = async (req) => {

    const result = await getData('invoice', 'shop_id',req.body.shop_id );
    return result;
}

exports.getInvoiceDetails = async (req)=>{
    const result = await getData('invoice_items natural join product', 'invoice_id',req.body.invoice_id );
    return result;
}


exports.updateInvoicePaidAmount = async (req)=>{
    const result = await incrementIntegers('invoice', 'paid_amount',req.body.amount_received, 'invoice_id', req.body.invoice_id);
    return result;
}

exports.generateInvoice = async (req) => {

    const shop_id = req.body.shop_id;
    const salesperson_id =req.body.salesperson_id;
    const products=JSON.parse(req.body.products);
    const createNewInvoice ='INSERT INTO invoice(shop_id, salesperson_id) VALUES ($1, $2) RETURNING invoice_id';
    const createNewInvoiceValues=[shop_id,salesperson_id];
    const TransactionsResult=await connection.queryTransactionsInvoice(createNewInvoice,createNewInvoiceValues,products,salesperson_id);
    return TransactionsResult;

}
