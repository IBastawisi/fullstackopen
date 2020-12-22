const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(cors())
app.use(express.json())

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :req[content-length] - :response-time ms :body'))

app.use(express.static('build'))

let contacts = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]

app.get('/api/contacts', (request, response) => {
    response.json(contacts)
})

app.get('/info', (request, response) => {
    response.send(`<p>phonebook has ${contacts.length} contacts</p>
    <p>${new Date().toString()}</p>`)
})

app.get('/api/contacts/:id', (request, response) => {
    const id = Number(request.params.id)
    const contact = contacts.find(contact => contact.id === id)

    if (contact) {
        response.json(contact)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/contacts/:id', (request, response) => {
    const id = Number(request.params.id)
    contacts = contacts.filter(contact => contact.id !== id)
    response.status(204).end()
})

const getRandomId = () => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);

app.post('/api/contacts', (request, response) => {
    const body = request.body

    if (contacts.find(c => c.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    if (!body.name) {
        return response.status(400).json({
            error: 'contact name is missing'
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: 'contact number is missing'
        })
    }

    const contact = {
        id: getRandomId(),
        name: body.name,
        number: body.number,
    }

    contacts = contacts.concat(contact)

    response.json(contact)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})