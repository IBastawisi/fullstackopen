require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(express.static('build'))
app.use(express.json())
app.use(cors())
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :req[content-length] - :response-time ms :body'))

const Contact = require('./models/contact')

app.get('/api/contacts', (request, response) => {
    Contact.find({}).then(contacts => {
        response.json(contacts)
    })
})

app.get('/info', (request, response) => {
    Contact.find({}).then(contacts => {
        response.send(`<p>phonebook has ${contacts.length} contacts</p>
        <p>${new Date().toString()}</p>`)
    })
})

app.get('/api/contacts/:id', (request, response, next) => {
    const id = request.params.id
    Contact.findById(id).then(contact => {
        if (contact) {
            response.json(contact)
        } else {
            response.status(404).end()
        }
    }).catch(error => next(error))
})

app.put('/api/contacts/:id', (request, response, next) => {
    const body = request.body
    const id = request.params.id
    const contact = {...body}
  
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

    Contact.findByIdAndUpdate(id, contact, { new: true })
      .then(updatedContact => {
        response.json(updatedContact)
      })
      .catch(error => next(error))
  })

app.delete('/api/contacts/:id', (request, response) => {
    const id = request.params.id
    Contact.findByIdAndRemove(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/contacts', (request, response) => {
    const body = request.body

    if (Contact.find({ name: body.name }).length > 0) {
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

    const contact = new Contact({ ...body })

    contact.save().then(savedContact => {
        console.log('saved');
        response.json(savedContact)
    })
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})