const { getData } = require('../db/index');




exports.getSuggestionData = async (req) => {
  console.log('de')
    const result = await getData('shop_suggestions', ['shop_suggestion_id'], req.body.shop_suggestion_id);
    return result;
}
