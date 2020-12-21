import React from 'react'
export const Contacts = ({contacts}) => <div>{contacts.map(c => <p key={c.id}>{c.name}: {c.number}</p>)}</div>