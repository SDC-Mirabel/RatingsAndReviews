const db = require('../database/index.js');

getReviews = (req, res) => {
  let queryId = req.query.product_id;
  let queryCount = req.query.count;
  let queryPage = 1 || req.query.page;

  let requestData = [queryId, queryCount];
  // console.log('req query params: ---', req);

  db.getReviews(requestData, (error, result) => {
    if (error) {
      res.status(404).send(error);
    } else {
      let response = {
        product: queryId,
        page: queryPage,
        count: queryCount,
        results: result.rows
      };
      res.status(200).send(result);
    }
  });
};

module.exports = {
  getReviews: getReviews
};