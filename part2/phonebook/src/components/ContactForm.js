import React from 'react'
export const ContactForm = ({ addContact, newName, handleNameInput, newNumber, handleNumberInput }) =>
    <form onSubmit={addContact}>
        <div>
            Name: <input value={newName} onInput={handleNameInput} />
        </div>
        <div>
            Number: <input value={newNumber} onInput={handleNumberInput} />
        </div>
        <div>
            <button type="submit">Add</button>
        </div>
    </form>
