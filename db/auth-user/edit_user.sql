update users
set username = ${revised_username}, ${revised_email}, ${revised_profile_pic},
where user_id = ${id};
