update journal
set entry = ${entry}
where entry_id = ${id}
returning journal;
