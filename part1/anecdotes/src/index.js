import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({ anecdote, votes }) => <>
  <p>{anecdote}</p>
  <p>has {votes} votes</p>
</>

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(Math.floor(Math.random() * anecdotes.length))
  const [votes, setVotes] = useState([...new Uint8Array(anecdotes.length)])

  const handleVote = () => {
    let copy = [...votes];
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <button onClick={() => handleVote()}>vote</button>
      <button onClick={() => setSelected(selected == anecdotes.length - 1 ? 0 : selected + 1)}>next</button>

      {Math.max(...votes) > 0 && <>
        <h1>Anecdote with most votes</h1>
        <Anecdote anecdote={anecdotes[votes.indexOf(Math.max(...votes))]} votes={Math.max(...votes)} />
      </>}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)