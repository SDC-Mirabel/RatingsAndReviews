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

module.exports = {
  returnOneReview: returnOneReview,
};
