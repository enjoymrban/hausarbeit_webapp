# Tour schema
# --- !Ups
create table box (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  title VARCHAR(20),
  description VARCHAR(20),
  PRIMARY KEY (id)
);


create table category(
  id BIGINT(20) NOT NULL AUTO_INCREMENT,
  title VARCHAR(20),
  PRIMARY KEY (id)
);


create table card (
  id BIGINT(20) NOT NULL AUTO_INCREMENT,
  question VARCHAR(20),
  answer VARCHAR(20),
  nTries int,
  nCorrect int,
  category_id BIGINT(20),
  box_id BIGINT(20),
  PRIMARY KEY (id),
  FOREIGN KEY (category_id) REFERENCES category (id),
  FOREIGN KEY (box_id) REFERENCES box (id)

);




# --- !Downs

drop table box;
drop table category;
drop table card;
