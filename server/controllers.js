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

getReviewsMeta = (req, res) => {
  let queryId = req.query.product_id;
  let requestData = [queryId];

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
      // store into object
    }
  db.getReviews(requestData, (error, result) => {
    if (error) {
      res.status(404).send(error);
    } else {
      // store into object
      res.status(200).send(/*object*/);
    }
  });
};
module.exports = {
  getReviews: getReviews
};