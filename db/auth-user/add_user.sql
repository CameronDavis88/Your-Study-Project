insert into user
(username, password, email, profile_pic)
values
(${username}, ${hash}, ${email}, ${profile_pic});
returning user_id, username, email, profile_picture;