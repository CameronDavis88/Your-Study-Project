select * from quotes
join users on quotes.user_id = users.user_id
order by quote_id desc;