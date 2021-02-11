create table users
(user_id serial primary key,
username varchar(50) not null,
password varchar(250) not null,
email varchar(200) not null;

create table journal
(entry_id serial primary key,
entry text,
user_id int references users(user_id)); 

create table quotes
(quote_id serial primary key,
quote text,
user_id int references users(user_id));

create table notes
(note_id serial primary key,
note text,
user_id int references users(user_id));

  