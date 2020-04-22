const { getData } = require('../db/index');




exports.getUserData = async (req) => {
  console.log('de')
    const result = await getData('district', ['district_id'], 1);
    return result;
}
