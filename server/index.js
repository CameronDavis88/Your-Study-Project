require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const authCtrl = require('./controllers/authController')
const mainCtrl = require('./controllers/mainController')
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env
const app = express()

app.use(express.json())

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 }
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
}).then(db => {
    app.set('db', db)
    console.log('db connected')
})

// //Auth/User Endpoints
// app.post('/api/register', authCtrl.register)
// app.post('/api/login', authCtrl.login)
// app.get('/api/logout', authCtrl.logout)

// app.put('/api/user/:id', authCtrl.updateUsername)


// //Journal Endpoints
// app.post('/api/entry', mainCtrl.createEntry)
// app.get('/api/journal/:id', mainCtrl.getUserJournal)
// app.delete('/api/entry/:id', mainCtrl.deleteEntry)


// // Quotes Endpoints
// app.post('/api/quote', mainCtrl.createQuote)
// app.get('/api/quotes/:id', mainCtrl.getUserQuotes)
// app.delete('/api/quote/:id', mainCtrl.deleteQuote)


// //Notes Endpoints
// app.post('/api/note', mainCtrl.createNote)
// app.get('/api/notes/:id', mainCtrl.getUserNotes)
// app.delete('/api/note/:id', mainCtrl.deleteNote)


app.listen(SERVER_PORT,() => console.log(`Listening on port ${SERVER_PORT}`))