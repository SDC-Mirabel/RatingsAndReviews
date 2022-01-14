/* eslint-disable quotes */
const { Client } = require('pg');
const pw = require('../postgresConfig.js');
const client = new Client({
  user: 'timnevada',
  password: pw,
  host: '',
  port: 5432,
  database: 'sdc'
});

// postgres.connect((err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('Connected to psql!');
//   }
// });

client.connect();

returnOneReview = (callback) => {
  var sqlString = 'select * from reviews where product_id = 1;';
  client.query(sqlString, (error, results, fields) => {
    if (error) {
      callback(error, null);
      console.log('goodbye');
    } else {
      callback(null, results);
      console.log('hello');
    }
  });
};

getReviews = (array, callback) => {
  var sqlString =
    `select reviews.id, rating, summary, recommended, response, body, review_date, reviewer_name, helpfulness,
    coalesce (json_agg(json_build_object('id', reviewsphotos.id, 'url', reviewsphotos.photo_url))
    filter (where reviewsphotos.id is not null), '[]') as photos
    from reviews inner join reviewsphotos on reviews.id = reviewsphotos.review_id
    where product_id = $1
    group by reviews.id
    limit $2;`;
  client.query(sqlString, array, (error, results) => {
    // console.log(array);
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports = {
  getReviews: getReviews,
  returnOneReview: returnOneReview,
};
