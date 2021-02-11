insert into users
(username, password, email)
values
(${username}, ${hash}, ${email})

returning user_id, username, email;