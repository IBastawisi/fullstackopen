import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Contacts } from './components/Contacts'
import { ContactForm } from './components/ContactForm'
import { Search } from './components/Search'
import contactService from './services/contacts'

const App = () => {
  const [contacts, setContacts] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    contactService.getAll()
      .then(contacts => setContacts(contacts))
  }, [])

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }

  const addContact = (event) => {
    event.preventDefault()
    const dublicate = contacts.find(c => c.name === newName)

    const contact = {
      name: newName,
      number: newNumber,
    }

    if (dublicate && window.confirm(`${contact.name} is already in the phonebook, update his number?`)) {
      contactService.update(dublicate.id, contact).then(returnedContact => {
        setContacts(contacts.map(c => c.id === returnedContact.id ? returnedContact : c))
        setNewName('')
        setNewNumber('')
      })
      return
    }

    contactService.create(contact).then(returnedContact => {
      setContacts(contacts.concat(returnedContact))
      setNewName('')
      setNewNumber('')
    })
  }

  const deleteContact = (contact) => {
    if (window.confirm(`Delete ${contact.name}?`)) {
      contactService.remove(contact.id)
        .then(() => {
          setContacts(contacts.filter(c => c.id != contact.id))
        })
        .catch(() => {
          alert(`${contact.name} was already deleted from server`)
        })
    }

  }

  const filteredContacts = searchQuery.trim().length > 0
    ? contacts.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : contacts

  return (
    <div>
      <h2>Phonebook</h2>
      <Search {...{ searchQuery, setSearchQuery }} />
      <h3>Add New</h3>
      <ContactForm {...{ addContact, newName, handleNameInput, newNumber, handleNumberInput }} />
      <h3>Numbers</h3>
      <Contacts contacts={filteredContacts} handleDelete={deleteContact} />
    </div>
  )
}

export default App