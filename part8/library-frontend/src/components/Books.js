import React, { useState } from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'

const Books = () => {
  const result = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState(null)

  if (result.loading) {
    return <div>loading...</div>
  }

  const genres = result.data && [...new Set(result.data.allBooks.flatMap(b => b.genres))]
  const books = genre ? result.data.allBooks.filter(b => b.genres.includes(genre)) : result.data.allBooks
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <button onClick={() => setGenre(null)} >All</button>
        {genres.map(g => <button key={g} onClick={() => setGenre(g)}>{g}</button>)}</div>
    </div>
  )
}

export default Books