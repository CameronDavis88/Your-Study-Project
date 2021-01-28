select * from quotes
join users on quotes.user_id = user.user_id;