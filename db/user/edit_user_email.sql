-- update users
-- set email = ${email}
-- where user_id = ${id};


-- select user_id, username, email, profile_pic from users
-- where user_id = ${id};

update users
set email = ${email}
where user_id = ${id};


select user_id, username, email from users
where user_id = ${id};