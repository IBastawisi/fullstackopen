import React, { useState } from 'react'
import { Contacts } from './components/Contacts'
import { ContactForm } from './components/ContactForm'
import { Search } from './components/Search'

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Arto Hellas', number: '040-123456' },
    { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
    { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }

  const addContact = (event) => {
    event.preventDefault()
    if (contacts.find(c => c.name === newName)) {
      return alert(`${newName} is already added to phonebook`)
    }

    const contact = {
      id: contacts.length + 1,
      name: newName,
      number: newNumber,
    }
    setContacts(contacts.concat(contact))
    setNewName('')
    setNewNumber('')
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
      <Contacts contacts={filteredContacts} />
    </div>
  )
}

export default App