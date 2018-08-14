BEGIN ;

DROP TABLE IF EXISTS user,recipe,tried CASCADE ;

CREATE TABLE user (
id SERIAL PRIMARY KEY,
username varchar(30) UNIQUE  NOT NULL,
password varchar(50) NOT NULL,
Fname varchar(50) NOT NULL,
Lname varchar (50) NOT NULL,
);

CREATE TABLE recipe(
id SERIAL PRIMARY KEY ,
content text NOT NULL,
date date  NOT NULL ,
user_id INTEGER NOT NULL REFERENCES  user(id) ON UPDATE CASCADE ,
)

CREATE TABLE tried (
id SERIAL PRIMARY KEY ,
user_id INTEGER NOT NULL REFERENCES  user(id) ON UPDATE CASCADE ,
recipe_id INTEGER NOT NULL REFERENCES  recipe(id) ON UPDATE CASCADE,
status boolean not null
);

COMMIT;