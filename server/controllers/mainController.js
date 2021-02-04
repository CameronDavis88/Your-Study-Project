module.exports = {
    // User Controllers

    updateUsername: (req, res) => {
        const { id } = req.params
        const { username } = req.params
        const db = req.app.get('db')
        db.user.edit_username({ id, username })
            .then(user => res.status(200).send(user))
            .catch(err => res.status(500).send(err))
    },
    updatePassword: (req, res) => {
        const { id } = req.params
        const { password } = req.params
        const db = req.app.get('db')
        db.user.edit_username({ id, password })
            .then(user => res.status(200).send(user))
            .catch(err => res.status(500).send(err))
    },

    updateProfilePic: (req, res) => {
        const { id } = req.params
        const { profilePic } = req.params
        const db = req.app.get('db')
        db.user.edit_username({ id, profilePic })
            .then(user => res.status(200).send(user))
            .catch(err => res.status(500).send(err))
    },

    // Journal Controllers

    createEntry: async (req, res) => {
        const { id } = req.params
        const { text } = req.body
        const db = req.app.get('db')
        const journal = await db.journal.add_entry({ id, text })
        res.status(200).send(journal)
    },

    getJournal: async (req, res) => {
        const { id } = req.params
        const db = req.app.get('db')
        const journal = await db.journal.get_journal({ id })
        res.status(200).send(journal)
    },

    deleteEntry: (req, res) => {
        const { id } = req.params
        const db = req.app.get('db')
        db.journal.delete_entry({ id })
            .then(() => res.status(200))
            .catch(err => res.status(500).send(err))
    },

    updateEntry: (req, res) => {
        const { id } = req.params
        const { entry } = req.body
        const db = req.app.get('db')
        db.journal.edit_entry({ id, entry })
            .then(entry => res.status(200).send(entry))
            .catch(err => res.status(500).send(err))
    },

    // Notes Controllers               -----unedited

    createNote: (req, res) => {
        const { id, note } = req.params
        const db = req.app.get('db')
        db.notes.add_note({ id, note })
            .then(() => res.status(200))
            .catch(err => res.status(500).send(err))
    },

    getNotes: (req, res) => {
        const { id } = req.params
        const db = req.app.get('db')
        db.notes.get_notes({ id })
            .then(notes => res.status(200).send(notes))
            .catch(err => res.status(500).send(err))
    },

    deleteNote: (req, res) => {
        const { id } = req.params
        const db = req.app.get('db')
        db.notes.delete_note({ id })
            .then(() => res.status(200))
            .catch(err => res.status(500).send(err))
    },

    updateNote: (req, res) => {
        const { id } = req.params
        const { entry } = req.params
        const db = req.app.get('db')
        db.notes.edit_note({ id, entry })
            .then(note => res.status(200).send(note))
            .catch(err => res.status(500).send(err))
    },

    //  Quotes Controllers-                     -------unedited

    createQuote: (req, res) => {
        const { id, quote } = req.params
        const db = req.app.get('db')
        db.quotes.add_entry({ id, quote })
            .then(() => res.status(200))
            .catch(err => res.status(500).send(err))
    },

    getQuotes: (req, res) => {
        const { id } = req.params
        const db = req.app.get('db')
        db.quotes.get_journal({ id })
            .then(quotes => res.status(200).send(quotes))
            .catch(err => res.status(500).send(err))
    },

    deleteQuote: (req, res) => {
        const { id } = req.params
        const db = req.app.get('db')
        db.quotes.delete_entry({ id })
            .then(() => res.status(200))
            .catch(err => res.status(500).send(err))
    },

    updateQuote: (req, res) => {
        const { id } = req.params
        const { quote } = req.params
        const db = req.app.get('db')
        db.quotes.edit_quote({ id, quote })
            .then(quote => res.status(200).send(quote))
            .catch(err => res.status(500).send(err))
    }

}