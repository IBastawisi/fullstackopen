import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Contacts } from './components/Contacts'
import { ContactForm } from './components/ContactForm'
import { Search } from './components/Search'

const App = () => {
  const [contacts, setContacts] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/contacts')
      .then(response => {
        setContacts(response.data)
      })
  }, [])

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