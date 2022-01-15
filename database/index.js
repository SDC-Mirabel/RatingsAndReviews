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

const getReviewsQuery =
`select reviews.id as review_id, rating, summary, recommended as recommend, response, body, to_timestamp(review_date / 1000) as date, reviewer_name, helpfulness,
coalesce (json_agg(json_build_object('id', reviewsphotos.id, 'url', reviewsphotos.photo_url))
filter (where reviewsphotos.id is not null), '[]') as photos
from reviews inner join reviewsphotos on reviews.id = reviewsphotos.review_id
where product_id = $1
group by reviews.id
limit $2;`;

const getReviewsMetaQuery =
`select product_id,
  json_build_object(
    '1', (select count(rating) from reviews where product_id = 1000011 AND rating = 1),
    '2', (select count(rating) from reviews where product_id = 1000011 AND rating = 2),
    '3', (select count(rating) from reviews where product_id = 1000011 AND rating = 3),
    '4', (select count(rating) from reviews where product_id = 1000011 AND rating = 4),
    '5', (select count(rating) from reviews where product_id = 1000011 AND rating = 5)) as ratings,
  json_build_object(
    'false', (select count(recommended) from reviews where product_id = 1000011 AND recommended = 'false'),
    'true', (select count(recommended) from reviews where product_id = 1000011 AND recommended = 'true')) as recommended,
  json_build_object(
    )
    from reviews where product_id = 1000011 group by reviews.product_id;`;

// select product_id, json_build_object(rating, count(rating)) as ratings from reviews where product_id = 1000011 group by reviews.product_id, rating;

getReviews = (queryParams, callback) => {
  console.log('in db, before the query: ---', queryParams);
  client.query(getReviewsQuery, queryParams)
    .then((response) => {
      // response.rows.forEach((reviewObject) => {
      //   reviewObject.date = new Date(Number(reviewObject.date));
      // });
      callback(null, response);
    })
    .catch((error => {
      callback(error);
    }));
};

// returnOneReview = (callback) => {
//   var sqlString = 'select * from reviews where product_id = 1;';
//   client.query(sqlString, (error, results, fields) => {
//     if (error) {
//       callback(error, null);
//       console.log('goodbye');
//     } else {
//       callback(null, results);
//       console.log('hello');
//     }
//   });
// };

module.exports = {
  getReviews: getReviews,
};
