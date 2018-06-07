# Tour schema
# --- !Ups
create table box (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  title VARCHAR(20),
  description VARCHAR(64),
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
  question VARCHAR(64),
  answer VARCHAR(64),
  nTries int,
  nCorrect int,
  category_id BIGINT(20),
  box_id BIGINT(20),
  PRIMARY KEY (id),
  FOREIGN KEY (category_id) REFERENCES category (id),
  FOREIGN KEY (box_id) REFERENCES box (id)

);

/*test data*/

INSERT INTO category (title) VALUES ('Englisch');

INSERT INTO box (title, description, color) VALUES ('englisch', 'letzte Prüfung', 'green');
INSERT INTO box (title, description, color) VALUES ('Geografie', 'Europas Hauptstädte', 'red');

INSERT INTO card (question, answer, nTries, nCorrect, category_id, box_id) VALUES ('Brotaufstrich', 'spread', 12, 6, 1, 1);
INSERT INTO card (question, answer, nTries, nCorrect, category_id, box_id) VALUES ('König', 'king', 6, 3, 1, 1);
INSERT INTO card (question, answer, nTries, nCorrect, category_id, box_id) VALUES ('Butter', 'butter', 8, 6, 1, 1);

INSERT INTO card (question, answer, nTries, nCorrect, category_id, box_id) VALUES ('Schweiz', 'Bern', 8, 6, 1, 2);
INSERT INTO card (question, answer, nTries, nCorrect, category_id, box_id) VALUES ('Deutschland', 'Berlin', 8, 6, 1, 2);
INSERT INTO card (question, answer, nTries, nCorrect, category_id, box_id) VALUES ('Frankreich', 'Paris', 8, 6, 1, 2);
INSERT INTO card (question, answer, nTries, nCorrect, category_id, box_id) VALUES ('Italien', 'Rom', 8, 6, 1, 2);
INSERT INTO card (question, answer, nTries, nCorrect, category_id, box_id) VALUES ('Tschechien', 'Prag', 8, 6, 1, 2);
INSERT INTO card (question, answer, nTries, nCorrect, category_id, box_id) VALUES ('Schweden', 'Stockholm', 8, 6, 1, 2);
INSERT INTO card (question, answer, nTries, nCorrect, category_id, box_id) VALUES ('Östereich', 'Wien', 8, 6, 1, 2);
INSERT INTO card (question, answer, nTries, nCorrect, category_id, box_id) VALUES ('Kroatien', 'Zegrab', 8, 6, 1, 2);
INSERT INTO card (question, answer, nTries, nCorrect, category_id, box_id) VALUES ('Polen', 'Warschau', 8, 6, 1, 2);
INSERT INTO card (question, answer, nTries, nCorrect, category_id, box_id) VALUES ('Montenegro', 'Potgorica', 8, 6, 1, 2);
INSERT INTO card (question, answer, nTries, nCorrect, category_id, box_id) VALUES ('Ukraine', 'Kiev', 8, 6, 1, 2);



INSERT INTO card (question, answer, nTries, nCorrect, category_id, box_id) VALUES ('assertiveness','Durchsetzungsvermögen',0,0,1,1);
INSERT INTO card (question, answer, nTries, nCorrect, category_id, box_id) VALUES('debrise','Trümmer',0,0,1,1);
INSERT INTO card (question, answer, nTries, nCorrect, category_id, box_id) VALUES('fuselage','Rumpf',0,0,1,1);
INSERT INTO card (question, answer, nTries, nCorrect, category_id, box_id) VALUES('metal fatigue','Metallermüdung',0,0,1,1);
INSERT INTO card (question, answer, nTries, nCorrect, category_id, box_id) VALUES('metal dsafd','dddddd',0,0,1,1);


# --- !Downs

drop table box;
drop table category;
drop table card;
