update users
set password = ${hash}
where user_id = ${id};

select user_id, username, email from users
where user_id = ${id};