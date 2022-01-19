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
  // console.log('req query params: ---', req.query);
  // console.log('requestData : ---', requestData);

  db.getReviewsMeta(requestData, (error, result) => {
    if (error) {
      res.status(404).send(error);
    } else {
      res.status(200).send(result.rows[0]);
    }
  });
};

module.exports = {
  getReviews: getReviews,
  getReviewsMeta: getReviewsMeta,
};

// scp -i sdc-rr.pem ./db.dump ubuntu@ec2-18-144-81-86.us-west-1.compute.amazonaws.com~/