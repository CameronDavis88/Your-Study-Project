const bcrypt = require('bcryptjs');
module.exports = {
    // User Controllers
    updateUsername: (req, res) => {
        const { id } = req.params;
        const { username } = req.body;
        const db = req.app.get('db');
        db.user.edit_username({ id, username })
            .then(([user]) => res.status(200).send(user))
            .catch(err => res.status(500).send(err))
    },
    updatePassword: (req,res) => {
        const { id } = req.params;
        const {password} = req.body;
        const db = req.app.get('db');
        let salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        db.user.edit_password({ id, hash })
        .then(([user])=> res.status(200).send(user))
        .catch(err => res.status(500).send(err))
    },
    updateEmail: (req, res) => {
        const { id } = req.params;
        const { email } = req.body;
        const db = req.app.get('db');
        db.user.edit_user_email({ id, email })
            .then(([user]) => res.status(200).send(user))
            .catch(err => res.status(500).send(err))
    },
    
    // Journal Controllers
    createEntry: async (req, res) => {
        const { id } = req.params;
        const { entry } = req.body;
        const db = req.app.get('db');
        const journal = await db.journal.add_entry({ id, entry });
        res.status(200).send(journal);
    },
    getJournal: async (req, res) => {
        const {id} = req.params;
        const db = req.app.get('db');
        const journal = await db.journal.get_journal({ id });
        res.status(200).send(journal);
    },
    deleteEntry: async (req,res)=> {
        const { id } = req.params ;
        const db = req.app.get('db');
        const journal = await db.journal.delete_entry({ id });
        res.status(200).send(journal);
    },
    updateEntry: async (req, res) => {
        const { id } = req.params;
        const { entry } = req.body;
        const db = req.app.get('db');
        const journal = await db.journal.edit_entry({ id, entry });
        res.status(200).send(journal);
    },

    // Notes Controllers 
    createNote: async (req, res) => {
        const { id } = req.params;
        const { note } = req.body;
        const db = req.app.get('db');
        const notes = await db.notes.add_note({ id, note });
        res.status(200).send(notes);
    },
    getNotes: async (req, res) => {
        const { id } = req.params;
        const db = req.app.get('db');
        const notes = await db.notes.get_notes({ id });
        res.status(200).send(notes);
    },
    deleteNote: async (req,res)=> {
        const { id } = req.params ;
        const db = req.app.get('db');
        const notes = await db.notes.delete_note({ id });
        res.status(200).send(notes);
    },
    updateNote: async (req, res) => {
        const { id } = req.params;
        const { note } = req.body;
        const db = req.app.get('db');
        const notes = await db.notes.edit_note({ id, note });
        res.status(200).send(notes);
    },

    //  Quotes Controllers- 
    createQuote: async (req, res) => {
        const { id } = req.params;
        const { quote } = req.body;
        const db = req.app.get('db');
        const quotes = await db.quotes.add_quote({ id, quote });
        res.status(200).send(quotes);
    },
    getQuotes: async (req, res) => {
        const { id } = req.params;
        const db = req.app.get('db');
        const quotes = await db.quotes.get_quotes({ id });
        res.status(200).send(quotes);
    },
    deleteQuote: async (req,res)=> {
        const { id } = req.params ;
        const db = req.app.get('db');
        const quotes = await db.quotes.delete_quote({ id });
        res.status(200).send(quotes);
    },
    updateQuote: async (req, res) => {
        const { id } = req.params;
        const { quote } = req.body;
        const db = req.app.get('db');
        const quotes = await db.quotes.edit_quote({ id, quote });
        res.status(200).send(quotes);
    }
};