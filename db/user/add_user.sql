insert into users
(username, password, email, profile_pic)
values
(${username}, ${hash}, ${email}, ${profilePic})

returning user_id, username, email, profile_pic;