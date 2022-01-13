CREATE SCHEMA ratingsAndReviews;

CREATE TABLE characteristics (
  ID SERIAL,
  PRODUCT_ID INT NOT NULL,
  CHARACTERISTIC_NAME VARCHAR(30),
  PRIMARY KEY (ID),
  FOREIGN KEY (PRODUCT_ID) REFERENCES reviews(PRODUCT_ID),
);

COPY characteristics(ID, PRODUCT_ID, CHARACTERISTIC_NAME)
FROM '/Users/timnevada/Documents/RFP57/sdc/RatingsAndReviews/csv_files/characteristics.csv'
DELIMITER ','
CSV HEADER;