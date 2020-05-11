const { getData } = require('../db/index');
const { insertData } = require('../db/index');
const { deleteData } = require('../db/index');
const { callTransactionInsertInsert} = require('../db/index');


exports.getSuggestionData = async (req) => {
  console.log('de')
    const result = await getData('shop_suggestions', ['shop_suggestion_id'], req.body.shop_suggestion_id);
    return result;
}


//const shopdata = await module.exports.getSuggestionData(req);

// exports.insertIntoShopOwner = async (name_with_initial,contact_num_cell,contact_num_land,residence_lattitude,residence_longitude,email) => {
//   const values=[name_with_initial,contact_num_cell,contact_num_land,residence_lattitude,residence_longitude,email]
//   const result = await insertData('shop_owner', ['name_with_initial','contact_num_cell','contact_num_land','residence_lattitude','residence_longitude','email'],values);
//   return result;
// }
//
//
// exports.insertIntoShop = async (route_id,name,latitude,longitude,shop_contact_num,owner_id) => {
//     const values=[owner_id,route_id,name,latitude,longitude,shop_contact_num]
//     const result = await insertData('shop', ['owner_id','route_id','name','latitude','longitude','shop_contact_num'],values);
//     return result;
// }

exports.alterShopShopOWner = async (shop_suggestion_id,name_with_initial,contact_num_cell,contact_num_land,residence_lattitude,residence_longitude,email,route_id,name,latitude,longitude,shop_contact_num) => {
  var owner_id=''
  table_name1='shop_owner'
  table_name2='shop'
  table_name3='shop_suggestions'
  column_names1=['name_with_initial','contact_num_cell','contact_num_land','residence_lattitude','residence_longitude','email']
  column_names2=['route_id','name','latitude','longitude','shop_contact_num','owner_id']
  column_names3=['shop_suggestion_id']
  values1=[name_with_initial,contact_num_cell,contact_num_land,residence_lattitude,residence_longitude,email]
  values2=[route_id,name,latitude,longitude,shop_contact_num,owner_id]
  values3=[shop_suggestion_id]

  const result = await callTransactionInsertInsert(table_name1,column_names1,values1,table_name2,column_names2,values2,table_name3,column_names3,values3)
  return result;
}



// exports.deleteData = async (req) => {
//     const result = await deleteData('employee_role_type', ['role_id'],26);
//     return result;
// }

// exports.deleteSuggestion = async (shop_suggestion_id) => {
//     const result = await deleteData('shop_suggestions', ['shop_suggestion_id'],shop_suggestion_id);
//     return result;
// }

exports.getAllAgents = async (req) => {
    const result = await getData('employee natural join employee_role_type', ['role_name'],'agent');
    return result;
}

exports.insertTarget = async (req) => {
    const result = await insertData('monthly_target', ['target_value'],[req.body.target_value]);
    return result;
}
