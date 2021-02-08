select * from notes
join users on notes.user_id = users.user_id
order by note_id desc;