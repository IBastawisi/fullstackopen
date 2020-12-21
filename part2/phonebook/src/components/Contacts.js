import React from 'react'
export const Contacts = ({ contacts, handleDelete }) =>
    <div>
        {contacts.map(c =>
            <div key={c.id}>
                <span>{c.name}: {c.number}</span>
                <button onClick={() => handleDelete(c)}>DELETE</button>
            </div>
        )}
    </div>