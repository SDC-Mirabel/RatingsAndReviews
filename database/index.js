/* eslint-disable quotes */
const { Pool } = require('pg');
const pw = require('../../postgresConfig.js');
const pool1 = new Pool({
  user: 'timnevada',
  password: pw,
  host: '',
  port: 5432,
  database: 'sdc'
});

pool1.connect();

const getReviewsQuery =
`select reviews.id as review_id, rating, summary, recommended as recommend, response, body, to_timestamp(review_date / 1000) as date, reviewer_name, helpfulness,
coalesce (json_agg(json_build_object('id', reviewsphotos.id, 'url', reviewsphotos.photo_url))
filter (where reviewsphotos.id is not null), '[]') as photos
from reviews inner join reviewsphotos on reviews.id = reviewsphotos.review_id
where product_id = $1
group by reviews.id
limit $2;`;

const getReviewsMetaQuery = `select reviews.product_id,
json_build_object(
  '1', (select count(rating) from reviews where product_id = $1 AND rating = 1),
  '2', (select count(rating) from reviews where product_id = $1 AND rating = 2),
  '3', (select count(rating) from reviews where product_id = $1 AND rating = 3),
  '4', (select count(rating) from reviews where product_id = $1 AND rating = 4),
  '5', (select count(rating) from reviews where product_id = $1 AND rating = 5)) as ratings,
  json_build_object(
  'false', (select count(recommended) from reviews where product_id = $1 AND recommended = 'false'),
  'true', (select count(recommended) from reviews where product_id = $1 AND recommended = 'true')) as recommended,
  json_object_agg(
    characteristics.characteristic_name, json_build_object
      ('id', characteristicreviews.id, 'value',
        (SELECT avg(characteristicreviews.characteristic_value) FROM characteristicreviews where characteristicreviews.characteristic_id = characteristics.id)
      )
    ) as characteristics
    from reviews
    left join characteristics on characteristics.product_id = reviews.product_id
    left join characteristicreviews on characteristicreviews.characteristic_id = characteristics.id
    where reviews.product_id = $1
    group by reviews.product_id;`;

// select product_id, json_build_object(rating, count(rating)) as ratings from reviews where product_id = 1000011 group by reviews.product_id, rating;
// const characteristicReviewsQuery = `select reviews.product_id, characteristics.characteristic_name, avg(characteristicreviews.characteristic_value) from reviews inner join characteristics on reviews.product_id = characteristics.product_id inner join characteristicreviews on characteristics.id = characteristicreviews.characteristic_id where reviews.product_id = 1 group by characteristics.characteristic_name, reviews.product_id;`;

getReviews = (queryParams, callback) => {
  pool1.query(getReviewsQuery, queryParams)
    .then((response) => {
      callback(null, response);
    })
    .catch((error => {
      callback(error);
    }));
};

getReviewsMeta = (queryParams, callback) => {
  pool1.query(getReviewsMetaQuery, queryParams)
    .then((response) => {
      callback(null, response);
    })
    .catch((error) => {
      callback(error);
    });
};

module.exports = {
  getReviews: getReviews,
  getReviewsMeta: getReviewsMeta,
};
