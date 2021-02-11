select * from journal
join users on journal.user_id = users.user_id
where users.user_id = ${id}
order by entry_id desc;


