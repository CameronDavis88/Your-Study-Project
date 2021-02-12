require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const authCtrl = require('./controllers/authController')
const mainCtrl = require('./controllers/mainController')
const path = require('path')
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

//Auth Endpoints
app.post('/api/register', authCtrl.register)
app.post('/api/login', authCtrl.login)
app.get('/api/logout', authCtrl.logout)

//User Endpoints
app.put('/api/user/:id', mainCtrl.updateUsername)
// app.put('/api/user/:id', mainCtrl.updatePassword)
// app.put('/api/user/:id', mainCtrl.updateProfilePic)
app.put('/api/user/:id', mainCtrl.updateEmail)

//Journal Endpoints
app.post('/api/entry/:id', mainCtrl.createEntry)
app.get('/api/journal/:id', mainCtrl.getJournal)
app.delete('/api/entry/:id', mainCtrl.deleteEntry)
app.put('/api/entry/:id', mainCtrl.updateEntry)

// Quotes Endpoints
app.post('/api/quote/:id', mainCtrl.createQuote)
app.get('/api/quotes/:id', mainCtrl.getQuotes)
app.delete('/api/quote/:id', mainCtrl.deleteQuote)
app.put('/api/quote/:id', mainCtrl.updateQuote)

//Notes Endpoints
app.post('/api/note/:id', mainCtrl.createNote)
app.get('/api/notes/:id', mainCtrl.getNotes)
app.delete('/api/note/:id', mainCtrl.deleteNote)
app.put('/api/note/:id', mainCtrl.updateNote)

app.use(express.static(__dirname + '/../build'))

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
})

app.listen(SERVER_PORT,() => console.log(`Listening on port ${SERVER_PORT}`))