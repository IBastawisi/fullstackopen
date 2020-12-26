import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote, createAnecdote } from './reducer'

const Anecdote = ({ anecdote, vote }) => <>
  <p>{anecdote.text}</p>
  <p>has {anecdote.votes} votes</p>
  <button onClick={vote}>vote</button>
</>

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()
  return anecdotes.sort((a, b) => b.votes - a.votes).map(a => <Anecdote key={a.id} anecdote={a} vote={() => dispatch(vote(a.id))} />)
}

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = (event) => {
    event.preventDefault()
    const text = event.target.text.value
    event.target.text.value = ''
    dispatch(createAnecdote(text))
  }

  return (
    <form onSubmit={add}>
      <input name="text" />
      <button type="submit">add</button>
    </form>
  )
}

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()
  const [selected, setSelected] = useState(Math.floor(Math.random() * anecdotes.length))
  const topVoted = anecdotes.find(a => a.votes === Math.max(...anecdotes.map(a => a.votes)))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} vote={() => dispatch(vote(anecdotes[selected].id))} />
      <button onClick={() => setSelected(selected == anecdotes.length - 1 ? 0 : selected + 1)}>next</button>

      {topVoted && <>
        <h1>Anecdote with most votes</h1>
        <Anecdote anecdote={topVoted} vote={() => dispatch(vote(topVoted.id))} />
      </>}

      <h3>Add Anecdotes</h3>
      <AnecdoteForm />
      <h1>All Anecdotes</h1>
      <AnecdoteList />
    </div>
  )
}

export default App