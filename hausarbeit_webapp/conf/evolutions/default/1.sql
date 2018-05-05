# Tour schema
# --- !Ups
create table box (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  title VARCHAR(20),
  description VARCHAR(20),
  color VARCHAR(20),
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


INSERT INTO box (title, description, color) VALUES ('englisch', 'letzte Prüfung', 'green');
INSERT INTO category (title) VALUES ('Englisch');
#INSERT INTO card ( question, answer, nTries, nCorrect, category_id, box_id) VALUES ('assertiveness','Durchsetzungsvermögen',0,0,1,1);
  #('debrise','Trümmer',0,0,1,1),
  #('fuselage','Rumpf',0,0,1,1),('metal fatigue','Metallermüdung',0,0,1,1);



# --- !Downs

drop table box;
drop table category;
drop table card;
