/**
 * import Router from express-promise-router
 */

const Router = require('express-promise-router');
 //const Router = require('express');


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
const graphController = require('../controllers/graphController.js');

const router = new Router();

//employee routes
router.get('/api/v1/employee/profile', employeeController.getUserData);
router.get('/api/v1/employee/auth', employeeController.getAuthData);
router.post('/api/v1/employee/register', employeeController.addEmployee);
router.post('/api/v1/employee/insert', employeeController.insertData);
router.post('/api/v1/employee/edit', employeeController.editUserData);

router.post('/api/v1/auth/employee/registeragent', employeeController.addAgent);
router.post('/api/v1/auth/employee/registersalesperson', employeeController.addSalesperson);
router.get('/api/v1/auth/employee/gettoken', employeeController.getToken);
router.get('/api/v1/auth/employee/generatetoken', employeeController.generateToken);
router.get('/api/v1/employee/test', employeeController.testToken);
router.get('/api/v1/auth/employee/test', employeeController.testToken);

//salesperson routes
router.get('/api/v1/salesperson/getdailytarget', salespersonController.getDailyTarget);
router.post('/api/v1/auth/salesperson/gettargetachieved', salespersonController.getTargetAchieved);
router.post('/salesperson/getunassigneddates', salespersonController.getUnassignedDays);


//agent routes
router.post('/api/v1/agent/suggest', agentController.suggestShops);
router.get('/api/v1/agent/viewsalesdates', agentController.viewSalesDates);

//owner routes
router.get('/api/v1/owner/viewsuggestion', ownerController.viewShopSuggestion);
router.post('/api/v1/owner/acceptsuggestion', ownerController.acceptShopSuggestion);
router.post('/api/v1/owner/declinesuggestion', ownerController.declineShopSuggestion);
router.get('/api/v1/owner/viewagents', ownerController.viewAgents);
router.post('/api/v1/owner/sendtarget', ownerController.sendTarget);
router.get('/api/v1/owner/viewmonthlytarget', ownerController.viewMonthlyTarget);

//salespersonRoutes routes
router.post('/api/v1/route/get-all-routes', routeController.getAllRoutes);


//Routes routes
router.get('/route/getlatest-routeid', routeController.getLatestRouteId);
router.post('/route/create-route', routeController.createNewRoute);



//shop routes
router.post('/shop/viewshops', shopController.getAllShops);
router.post('/api/v1/shop/viewshopdetails', shopController.getShopDetails);
router.post('/shop/viewshopsbydistrict',shopController.getShopsByDistrict);
router.post('/shop/viewshops-withroutebydistrict',shopController.getShopsInRouteByDistrict);
router.post('/shop/viewshops-withnoroutebydistrict',shopController.getShopsNotInRouteByDistrict);
router.post('/api/v1/shop/get-shops-selected-route',shopController.getShopsInSelectedRoute);
router.get('/api/v1/shop/viewagentshops', shopController.viewShops);

//invoice routes
router.post('/api/v1/invoice/viewallinvoices', invoiceController.getAllInvoices);
router.post('/api/v1/invoice/viewallinvoices', invoiceController.getInvoiceDetails);
router.put('/api/v1/invoice/updateinvoicepaidamount',invoiceController.updateInvoicePaidAmount);
router.post('/api/v1/invoice/generateInvoice', invoiceController.generateInvoice);


//requesting invoice routes
router.get('/api/v1/reqinvoice/viewsuggestedlist', reqInvoiceController.viewSuggestedList);
router.post('/api/v1/reqinvoice/declaresuggestion', reqInvoiceController.declareSuggestion);
router.get('/api/v1/reqinvoice/viewacceptedlist', reqInvoiceController.viewAcceptedList);
router.get('/api/v1/reqinvoice/viewreqinvoices', reqInvoiceController.viewAllInvoices);
router.get('/api/v1/reqinvoice/getagentids', reqInvoiceController.getAgentIds);
router.post('/api/v1/reqinvoice/sendrequest', reqInvoiceController.sendRequest);

//product routes
router.post('/api/v1/product/send-to-agent', productController.sendtoAgent);
router.post('/api/v1/product/send-agent-requested', productController.sendAgentRequested);
//router.post('/api/v1/product/sendtoagent', productController.sendAgentReq);
router.post('/api/v1/product/addnewproduct', productController.addNewProduct);
router.post('/api/v1/product/additems', productController.addProductItems);
router.get('/api/v1/product/allids', productController.allProductIds);

//report routes
router.get('/api/v1/report/viewreport', reportController.viewReport);
router.get('/api/v1/report/top-pr-owner-month', reportController.viewTopProductsMonthOwner);
router.get('/api/v1/report/top-pr-owner-year', reportController.viewTopProductsYearOwner);
router.get('/api/v1/report/top-pr-agent-month', reportController.viewTopProductsMonthAgent);
router.get('/api/v1/report/top-pr-agent-year', reportController.viewTopProductsYearAgent);
router.get('/api/v1/report/top-dis-month', reportController.viewTopDistrictsMonth);
router.get('/api/v1/report/top-dis-year', reportController.viewTopDistrictsYear);

//stock routes
router.get('/api/v1/stock/viewagentstock',stockController.viewAgentStock);
router.get('/api/v1/stock/viewwarehouse',stockController.viewWarehouseStock);
router.post('/api/v1/stock/viewsalespersonstock',stockController.viewSalespersonStock);
router.post('/api/v1/stock/addtoagentstock',stockController.addToAgentStock);
router.post('/api/v1/stock/addtosalespersonstock',stockController.addToSalespersonStock);

//graph Routes
router.get('/api/v1/graph/agentlinegraph',graphController.agentLineGraph);
router.get('/api/v1/graph/ownerlinegraph',graphController.ownerLineGraph);
router.get('/api/v1/graph/agentbargraph',graphController.agentBarGraph);
router.get('/api/v1/graph/ownerbargraph',graphController.ownerBarGraph);
router.get('/api/v1/graph/dis-month-graph',graphController.districtsMonthGraph);
router.get('/api/v1/graph/dis-yr-graph',graphController.districtsYearGraph);
router.get('/api/v1/graph/dis-month-bar-graph',graphController.districtsMonthBarGraph);
router.get('/api/v1/graph/dis-yr-bar-graph',graphController.districtsYearBarGraph);



//test routes
const sample = require('../test/sample.js');
// router.post('/owner/delete', ownerController.deleteData);
// router.post('/employee/update', employeeController.updateUserData);
router.get('/sample', sample.sampleData);


// router.get('/api/v1/todos', toDoController.getAllTodos);
// router.get('/api/v1/todos/:id', toDoController.getTodo);

module.exports= router;
