import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const EditAuthor = ({ Notify, authors }) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const [changeYear, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      Notify(error.graphQLErrors[0]?.message || error.message)
    }

  })

  useEffect(() => {
    if (result.data && !result.data.editAuthor) {
      Notify('name not found')
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()

    changeYear({ variables: { name, year } })

    setName('')
    setYear('')
  }

  return (
    <div>
      <h2>change year</h2>

      <form onSubmit={submit}>
        <div>
          name <select value={name} onChange={({ target }) => setName(target.value)}>
          <option value=''>Please Select</option>
            {authors.map(a => <option key={a.name} value={a.name}>{a.name}</option>)}
          </select>
        </div>
        <div>
          birtyear <input name='birthyear'
            value={year}
            onChange={({ target }) => setYear(+target.value)}
          />
        </div>
        <button type='submit'>change year</button>
      </form>
    </div>
  )
}

export default EditAuthor