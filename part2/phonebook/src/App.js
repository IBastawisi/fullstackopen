import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Contacts } from './components/Contacts'
import { ContactForm } from './components/ContactForm'
import { Search } from './components/Search'
import contactService from './services/contacts'
import { Announcer } from './components/Announcer'

const App = () => {
  const [contacts, setContacts] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [announcement, setAnnouncement] = useState(null)

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

    if (dublicate) {
      const confirmed =  window.confirm(`${contact.name} is already in the phonebook, update his number?`)
      confirmed && contactService.update(dublicate.id, contact).then(returnedContact => {
        setAnnouncement({
          message: `${contact.name} was successfully updated`,
          style: 'success'
        })
        setTimeout(() => {
          setAnnouncement(null)
        }, 3000)
        setContacts(contacts.map(c => c.id === returnedContact.id ? returnedContact : c))
        setNewName('')
        setNewNumber('')
      })
      return
    }

    contactService.create(contact).then(returnedContact => {
      setAnnouncement({
        message: `${contact.name} was successfully added`,
        style: 'success'
      })
      setTimeout(() => {
        setAnnouncement(null)
      }, 3000)

      setContacts(contacts.concat(returnedContact))
      setNewName('')
      setNewNumber('')
    })
  }

  const deleteContact = (contact) => {
    if (window.confirm(`Delete ${contact.name}?`)) {
      contactService.remove(contact.id)
        .then(() => {
          setAnnouncement({
            message: `${contact.name} was successfully deleted`,
            style: 'success'
          })
          setTimeout(() => {
            setAnnouncement(null)
          }, 3000)
  
          setContacts(contacts.filter(c => c.id != contact.id))
        })
        .catch(() => {
          setAnnouncement({
            message: `${contact.name} was already deleted from server`,
            style: 'error'
          })
          setTimeout(() => {
            setAnnouncement(null)
          }, 3000)
          setContacts(contacts.filter(c => c.id != contact.id))
        })
    }

  }

  const filteredContacts = searchQuery.trim().length > 0
    ? contacts.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : contacts

  return (
    <div>
      <h2>Phonebook</h2>
      <Announcer {...{announcement}} />
      <Search {...{ searchQuery, setSearchQuery }} />
      <h3>Add New</h3>
      <ContactForm {...{ addContact, newName, handleNameInput, newNumber, handleNumberInput }} />
      <h3>Numbers</h3>
      <Contacts contacts={filteredContacts} handleDelete={deleteContact} />
    </div>
  )
}

export default App