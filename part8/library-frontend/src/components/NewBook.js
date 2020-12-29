import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

import { CREATE_BOOK, RECOMMENDED_BOOKS } from '../queries'

const NewBook = ({ Notify, updateCacheWith }) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      Notify(error.graphQLErrors[0]?.message || error.message)
    },

    update: (store, response) => {
      updateCacheWith(response.data.addBook)
      const recommendedBooksQuery = store.readQuery({ query: RECOMMENDED_BOOKS })
      const genreMatch = genres.filter(g => recommendedBooksQuery.recommendedBooks[0].genres.includes(g))
      
      if (genreMatch.length > 0) {
        store.writeQuery({
          query: RECOMMENDED_BOOKS,
          data: {
            ...recommendedBooksQuery,
            recommendedBooks: [...recommendedBooksQuery.recommendedBooks, response.data.addBook]
          }
        })

      }
    }
  })

  const submit = async (event) => {
    event.preventDefault()
    createBook({
      variables: { title, author, published, genres }
    })

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input name='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input name='author'
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input name='published'
            type='number'
            value={published}
            onChange={({ target }) => setPublished(+target.value)}
          />
        </div>
        <div>
          <input name='genre'
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook