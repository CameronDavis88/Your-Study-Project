delete from notes
where note_id = ${id}
returning notes;
