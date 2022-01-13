CREATE TABLE reviewsPhotos (
  ID SERIAL,
  REVIEW_ID INT NOT NULL,
  PHOTO_URL VARCHAR(300),
  PRIMARY KEY (ID),
  FOREIGN KEY (REVIEW_ID) REFERENCES reviews(ID)
);

COPY reviewsPhotos(ID, REVIEW_ID, PHOTO_URL)
FROM '/Users/timnevada/Documents/RFP57/sdc/RatingsAndReviews/csv_files/reviews_photos.csv'
DELIMITER ','
CSV HEADER;