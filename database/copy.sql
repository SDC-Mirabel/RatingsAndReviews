COPY reviews(ID, PRODUCT_ID, RATING, REVIEW_DATE, SUMMARY, BODY, RECOMMENDED, REPORTED, REVIEWER_NAME, REVIEWER_EMAIL, RESPONSE, HELPFULNESS)
FROM '/Users/timnevada/Documents/RFP57/sdc/RatingsAndReviews/csv_files/reviews.csv'
DELIMITER ','
CSV HEADER;

COPY reviewsPhotos(ID, REVIEW_ID, PHOTO_URL)
FROM '/Users/timnevada/Documents/RFP57/sdc/RatingsAndReviews/csv_files/reviews_photos.csv'
DELIMITER ','
CSV HEADER;

COPY characteristicReviews(ID, CHARACTERISTIC_ID, REVIEW_ID, CHARACTERISTIC_VALUE)
FROM '/Users/timnevada/Documents/RFP57/sdc/RatingsAndReviews/csv_files/characteristic_reviews.csv'
DELIMITER ','
CSV HEADER;

COPY characteristics(ID, PRODUCT_ID, CHARACTERISTIC_NAME)
FROM '/Users/timnevada/Documents/RFP57/sdc/RatingsAndReviews/csv_files/characteristics.csv'
DELIMITER ','
CSV HEADER;