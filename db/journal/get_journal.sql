select * from journal
join users on journal.user_id = user.user_id;