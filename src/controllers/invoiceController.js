const invoiceModel = require('../models/invoiceModel.js');


class Invoice {


  async getAllInvoices(req, res) {
    const result = await invoiceModel.getAllInvoices(req);
    if(result.success){
        const  invoices= [];
          result.data.forEach(async (invoice)=>{

          const result2 = await invoiceModel.getInvoiceDetails({"body":{"invoice_id":invoice.invoice_id}});
          let invoice_value= 0;

           if(result2.success){
                result2.data.forEach((product)=>{
                    invoice_value=invoice_value+(product.quantity * product.selling_price);
                });
           }
          let invoiceDetail={'invoice_id': invoice.invoice_id,
                             'issued_date' : invoice.issued_date.toISOString().slice(0,10),
                             'paid_amount' : invoice.paid_amount,
                             'invoice_value' : invoice_value,

            }
            invoices.push(invoiceDetail);

            if (result.data.length==invoices.length){
                return res.status(200).send({
                  success: result.success,
                  data:invoices});
            }
          });


    }else{
        return res.status(200).send({
            success : result.success,
            errorType: result.errorType,
            error: result.error
        });
    }
  }



  async getInvoiceDetails(req, res) {
      const result = await invoiceModel.getInvoiceDetails(req);
      if(result.success){
          let slicedData= [];
          result.data.forEach((product)=>{
          let slicedProductDetail={'product_id': product.product_id,
                                 'name' : product.name,
                                 'quantity' : product.quantity,
                                 'selling_price' : product.selling_price,
                                 'total': (product.quantity * product.selling_price)
            }
            slicedData.push(slicedProductDetail);
          });
          return res.status(200).send({
              success: result.success,
              data:slicedData});

      }else{
          return res.status(200).send({
              success : result.success,
              errorType: result.errorType,
              error: result.error
          });
      }
    }


    async updateInvoicePaidAmount(req,res) {
        const result = await invoiceModel.updateInvoicePaidAmount(req);
        if (result.success) {
          return res.status(200).send({success:result.success});
        } else {
          return res.status(200).send({
            success: result.success,
            errorType: result.errorType,
            error: result.error
          });
        }
    }

    async generateInvoice(req, res) {

        const result = await invoiceModel.generateInvoice(req);
        if (result.success) {
          return res.send({success:result.success});
        } else {
          return res.status(200).send({
            success: result.success,
            errorType: result.errorType,
            error: result.error
          });
        }
      }


};





const invoice = new Invoice();
module.exports = invoice;
