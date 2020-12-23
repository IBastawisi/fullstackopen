const contactsRouter = require('express').Router()
const Contact = require('../models/contact')

contactsRouter.get('/', (request, response) => {
  Contact.find({}).then(contacts => {
    response.json(contacts)
  })
})

contactsRouter.get('/info', (request, response) => {
  Contact.find({}).then(contacts => {
    response.send(`<p>phonebook has ${contacts.length} contacts</p>
        <p>${new Date().toString()}</p>`)
  })
})

contactsRouter.get('/:id', (request, response, next) => {
  const id = request.params.id
  Contact.findById(id).then(contact => {
    if (contact) {
      response.json(contact)
    } else {
      response.status(404).end()
    }
  }).catch(error => next(error))
})

contactsRouter.put('/:id', (request, response, next) => {
  const body = request.body
  const id = request.params.id
  const contact = { ...body }

  Contact.findByIdAndUpdate(id, contact, { new: true, runValidators: true, context: 'query' })
    .then(updatedContact => {
      response.json(updatedContact)
    })
    .catch(error => next(error))
})

contactsRouter.delete('/:id', (request, response, next) => {
  const id = request.params.id
  Contact.findByIdAndRemove(id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

contactsRouter.post('/', (request, response, next) => {
  const body = request.body
  const contact = new Contact({ ...body })

  contact.save().then(savedContact => {
    console.log('saved')
    response.json(savedContact)
  }).catch(error => next(error))
})

module.exports = contactsRouter