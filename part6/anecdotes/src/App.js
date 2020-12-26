import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { initApp, vote, createAnecdote, announce } from './reducer'
import { Announcer } from './Announcer'
import Filter from './Filter'
import './App.css'

const Anecdote = ({ anecdote, vote }) => <>
  <p>{anecdote.text}</p>
  <p>has {anecdote.votes} votes</p>
  <button onClick={vote}>vote</button>
</>

const AnecdoteList = props => {
  const addVote = object => {
    props.vote(object)
    props.announce({
      message: 'You voted successfully',
      style: 'success'
    })
  }

  return <>
    <Filter />
    {props.anecdotes.map(a => <Anecdote key={a.id} anecdote={a} vote={() => addVote(a)} />)}
  </>
}

const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes.filter(a => a.text.toLowerCase().includes(state.filter.toLowerCase())),
  }
}

const mapDispatchToProps = { vote, announce }

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

const AnecdoteForm = props => {
  const add = event => {
    event.preventDefault()
    const text = event.target.text.value
    event.target.text.value = ''
    props.createAnecdote(text)
    props.announce({
      message: 'Anecdote was added successfully',
      style: 'success'
    })
  }

  return (
    <form onSubmit={add}>
      <input name="text" />
      <button type="submit">add</button>
    </form>
  )
}

const ConnectedAnecdoteForm = connect(null, { createAnecdote, announce })(AnecdoteForm)

const DailyAnecdote = props => {
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (props.anecdotes) {
      !selected && setSelected(Math.floor(Math.random() * props.anecdotes.length))
    }
  }, [props.anecdotes])

  const addVote = object => {
    props.vote(object)
    props.announce({
      message: 'You voted successfully',
      style: 'success'
    })
  }


  return selected ? <> <Anecdote anecdote={props.anecdotes[selected]} vote={() => addVote(props.anecdotes[selected])} />
    <button onClick={() => setSelected(selected === props.anecdotes.length - 1 ? 0 : selected + 1)}>next</button></> : null
}

const ConnectedDailyAnecdote = connect(state => {
  return { anecdotes: state.anecdotes }
}, { vote, announce })(DailyAnecdote)

const MostVotedAnecdote = props => {
  const addVote = object => {
    props.vote(object)
    props.announce({
      message: 'You voted successfully',
      style: 'success'
    })
  }

  return props.anecdote ? <Anecdote anecdote={props.anecdote} vote={() => addVote(props.anecdote)} /> : null
}

const ConnectedMostVotedAnecdote = connect(state => {
  return { anecdote: state.anecdotes.find(a => a.votes === Math.max(...state.anecdotes.map(a => a.votes))) }
}, { vote, announce })(MostVotedAnecdote)

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initApp())
  }, [dispatch])

  return (
    <div>
      <Announcer />
      <h1>Anecdote of the day</h1>
      <ConnectedDailyAnecdote />
      <h1>Anecdote with most votes</h1>
      <ConnectedMostVotedAnecdote />
      <h3>Add Anecdotes</h3>
      <ConnectedAnecdoteForm />
      <h1>All Anecdotes</h1>
      <ConnectedAnecdoteList />
    </div>
  )
}

export default App