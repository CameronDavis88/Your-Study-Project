insert into journal
(entry, user_id)
values
(${text}, ${id});

select * from journal 
where user_id = ${id};