CREATE SCHEMA ratingsAndReviews;

CREATE TABLE reviews (
  ID SERIAL,
  PRODUCT_ID INT NOT NULL,
  RATING INT NOT NULL,
  REVIEW_DATE BIGINT,
  SUMMARY VARCHAR(300),
  BODY VARCHAR(1000),
  RECOMMENDED BOOLEAN,
  REPORTED BOOLEAN,
  REVIEWER_NAME VARCHAR(30),
  REVIEWER_EMAIL VARCHAR(50),
  RESPONSE VARCHAR(300),
  HELPFULNESS INT,
  PRIMARY KEY (ID)
);

CREATE TABLE reviewsPhotos (
  ID SERIAL,
  REVIEW_ID INT NOT NULL,
  PHOTO_URL VARCHAR(300),
  PRIMARY KEY (ID),
  FOREIGN KEY (REVIEW_ID) REFERENCES reviews(ID)
);

CREATE TABLE characteristics (
  ID SERIAL,
  PRODUCT_ID INT NOT NULL,
  CHARACTERISTIC_NAME VARCHAR(30),
  PRIMARY KEY (ID)
);

CREATE TABLE characteristicReviews (
  ID SERIAL,
  CHARACTERISTIC_ID INT NOT NULL,
  REVIEW_ID INT NOT NULL,
  CHARACTERISTIC_VALUE INT NOT NULL,
  PRIMARY KEY (ID),
  FOREIGN KEY (CHARACTERISTIC_ID) REFERENCES characteristics(ID),
  FOREIGN KEY (REVIEW_ID) REFERENCES reviews(ID)
);