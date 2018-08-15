BEGIN ;

DROP TABLE IF EXISTS users,recipe,tried CASCADE ;


CREATE TABLE users (
id SERIAL PRIMARY KEY,
username varchar(30) UNIQUE  NOT NULL,
password varchar NOT NULL,
Fname varchar(50) NOT NULL,
Lname varchar (50) NOT NULL
);

CREATE TABLE recipe(
id SERIAL PRIMARY KEY ,
content text NOT NULL,
date date  NOT NULL ,
user_id INTEGER NOT NULL REFERENCES  users(id) ON UPDATE CASCADE
);

CREATE TABLE tried (
id SERIAL PRIMARY KEY ,
user_id INTEGER NOT NULL REFERENCES  users(id) ON UPDATE CASCADE ,
recipe_id INTEGER NOT NULL REFERENCES  recipe(id) ON UPDATE CASCADE,
status boolean not null
);

insert into users (username,password,fname,Lname) values ('1','1','1','1');

insert into recipe (content,user_id,date) values ('GAZA','1','1-5-1998');
COMMIT;