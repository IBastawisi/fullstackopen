import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote, createAnecdote, announce, clearAnnouncement, filterChange } from './reducer'
import { Announcer } from './Announcer'
import Filter from './Filter'
import './App.css'

const Anecdote = ({ anecdote, vote }) => <>
  <p>{anecdote.text}</p>
  <p>has {anecdote.votes} votes</p>
  <button onClick={vote}>vote</button>
</>

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes.filter(a => a.text.toLowerCase().includes(state.filter.toLowerCase())))
  const dispatch = useDispatch()
  const addVote = (id) => {
    dispatch(vote(id))
    dispatch(announce({
      message: 'You voted successfully',
      style: 'success'
    }))
    setTimeout(() => {
      dispatch(clearAnnouncement())
    }, 3000)
  }

  return <>
    <Filter />
    {anecdotes.sort((a, b) => b.votes - a.votes).map(a => <Anecdote key={a.id} anecdote={a} vote={() => addVote(a.id)} />)}
  </>
}

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = (event) => {
    event.preventDefault()
    const text = event.target.text.value
    event.target.text.value = ''
    dispatch(createAnecdote(text))
    dispatch(announce({
      message: 'Anecdote was added successfully',
      style: 'success'
    }))
    setTimeout(() => {
      dispatch(clearAnnouncement())
    }, 3000)

  }

  return (
    <form onSubmit={add}>
      <input name="text" />
      <button type="submit">add</button>
    </form>
  )
}

const App = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()
  const [selected, setSelected] = useState(Math.floor(Math.random() * anecdotes.length))
  const topVoted = anecdotes.find(a => a.votes === Math.max(...anecdotes.map(a => a.votes)))

  const addVote = (id) => {
    dispatch(vote(id))
    dispatch(announce({
      message: 'You voted successfully',
      style: 'success'
    }))
    setTimeout(() => {
      dispatch(clearAnnouncement())
    }, 3000)
  }

  return (
    <div>
      <Announcer />
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} vote={() => addVote(anecdotes[selected].id)} />
      <button onClick={() => setSelected(selected == anecdotes.length - 1 ? 0 : selected + 1)}>next</button>

      {topVoted && <>
        <h1>Anecdote with most votes</h1>
        <Anecdote anecdote={topVoted} vote={() => addVote(topVoted.id)} />
      </>}

      <h3>Add Anecdotes</h3>
      <AnecdoteForm />
      <h1>All Anecdotes</h1>
      <AnecdoteList />
    </div>
  )
}

export default App