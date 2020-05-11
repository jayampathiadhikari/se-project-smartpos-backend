const {getData} = require('../db/index');
const {updateSingleData} = require('../db/index');
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
    const result = await updateSingleData('invoice', 'paid_amount',req.body.amount_received, 'invoice_id', req.body.invoice_id);
    return result;
}

exports.generateInvoice = async (req) => {

        const invoiceGenerateResult = await insertData('invoice',['shop_id','salesperson_id'],[req.body.shop_id,req.body.salesperson_id]);

        if (invoiceGenerateResult.success){
            console.log(invoiceGenerateResult);
            const products=req.body.products
            const invoice_id=invoiceGenerateResult.data[0].invoice_id

            let text1 = `INSERT INTO invoice_items (invoice_id,product_id,quantity) VALUES `;
            let text1_concat_str='';
            let value1=[];

            for (let i = 0; i < products.length; i++) {
                let x=3*i+1;
                text1_concat_str+=' ($'+x+',$'+(x+1)+',$'+(x+2)+'),';
                value1.push(invoice_id);
                value1.push(products[i]['product_id']);
                value1.push(products[i]['quantity']);

            };
            text1+=text1_concat_str.slice(0,-1);

            texts=[text1];
            values=[value1];

            for (let i = 0; i < products.length; i++) {
                texts.push(`update salesperson_stock set remaining_quantity =remaining_quantity-${products[i].quantity} where salesperson_id=$1 and stock_received_date =$2 and product_id=$3`);
                values.push([req.body.salesperson_id,new Date().toISOString().slice(0,10),products[i].product_id]);
            };

            const TransactionsResult=await connection.queryTransactions(texts,values);

            if (! TransactionsResult.success){
                const deleteResult = await deleteData('invoice', 'invoice_id', invoice_id);
                return deleteResult;
            }
            return TransactionsResult;
        }
        return invoiceGenerateResult;

}





