/**
 * import Router from express-promise-router
 */

const Router = require('express-promise-router');

const employeeController = require('../controllers/employeeController.js');
const agentController = require('../controllers/agentController.js');
const ownerController = require('../controllers/ownerController.js');
const reqInvoiceController = require('../controllers/reqInvoiceController.js');
const productController = require('../controllers/productController.js');
const reportController = require('../controllers/reportController.js');
const stockController = require('../controllers/stockController.js');
const salespersonController = require('../controllers/salespersonController.js');
const shopController = require('../controllers/shopController.js');
const routeController = require('../controllers/routeController.js');
const invoiceController = require('../controllers/invoiceController.js');

const router = new Router();


//employee routes
router.get('/employee/profile', employeeController.getUserData);
router.get('/employee/auth', employeeController.getAuthData);
router.post('/employee/register', employeeController.addEmployee);
router.post('/employee/insert', employeeController.insertData);
router.post('/employee/edit', employeeController.editUserData);

//salesperson routes
router.get('/salesperson/getdailytarget', salespersonController.getDailyTarget);

//agent routes
router.post('/agent/suggest', agentController.suggestShops);
router.get('/agent/viewsalesdates', agentController.viewSalesDates);

//owner routes
router.get('/owner/viewsuggestion', ownerController.viewShopSuggestion);
router.post('/owner/acceptsuggestion', ownerController.acceptShopSuggestion);
router.post('/owner/declinesuggestion', ownerController.declineShopSuggestion);
router.get('/owner/viewagents', ownerController.viewAgents);
router.post('/owner/sendtarget', ownerController.sendTarget);
router.get('/owner/viewmonthlytarget', ownerController.viewMonthlyTarget);

//salespersonRoutes routes
router.post('/route/getAllRoutes', routeController.getAllRoutes);


//shop routes
router.post('/shop/viewshops', shopController.getAllShops);
router.post('/shop/viewshopdetails', shopController.getShopDetails);
router.post('/shop/viewshopsbydistrict',shopController.getShopsByDistrict);
router.post('/shop/viewshops-withroutebydistrict',shopController.getShopsInRouteByDistrict);
router.post('/shop/viewshops-withnoroutebydistrict',shopController.getShopsNotInRouteByDistrict);
router.get('/shop/viewagentshops', shopController.viewShops);


//invoice routes
router.post('/invoice/viewallinvoices', invoiceController.getAllInvoices);
router.post('/invoice/viewinvoicedetails', invoiceController.getInvoiceDetails);
router.put('/invoice/updateinvoicepaidamount',invoiceController.updateInvoicePaidAmount);
router.post('/invoice/generateInvoice', invoiceController.generateInvoice);


//requesting invoice routes
router.get('/reqinvoice/viewSuggestedList', reqInvoiceController.viewSuggestedList);
router.post('/reqinvoice/declareSuggestion', reqInvoiceController.declareSuggestion);
router.get('/reqinvoice/viewAcceptedList', reqInvoiceController.viewAcceptedList);
router.post('/reqinvoice/sendRequest', reqInvoiceController.sendRequest);

//product routes
router.post('/product/sendtoAgent', productController.sendtoAgent);
router.post('/product/addnewproduct', productController.addNewProduct);
router.post('/product/additems', productController.addProductItems);

//report routes
router.get('/agent/viewreport', reportController.viewReport);

//stock routes
router.get('/stock/viewagentstock',stockController.viewAgentStock);
router.get('/stock/viewwarehouse',stockController.viewWarehouseStock);
router.post('/stock/viewsalespersonstock',stockController.viewSalespersonStock);

router.post('/stock/addtoagentstock',stockController.addToAgentStock);
router.post('/stock/addtosalespersonstock',stockController.addToSalespersonStock);


//test routes
// router.post('/owner/delete', ownerController.deleteData);
// router.post('/employee/update', employeeController.updateUserData);
//router.get('/employee/count', employeeController.getCount);


// router.get('/api/v1/todos', toDoController.getAllTodos);
// router.get('/api/v1/todos/:id', toDoController.getTodo);

module.exports= router;
