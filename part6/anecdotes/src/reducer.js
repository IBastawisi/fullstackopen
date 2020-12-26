const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

export const createAnecdote = (text) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      text,
      votes: 0,
      id: generateId()
    }
  }
}

export const vote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

const initialState = [
  { id: generateId(), text: 'If it hurts, do it more often', votes: 2 },
  { id: generateId(), text: 'Adding manpower to a late software project makes it later!', votes: 5 },
  { id: generateId(), text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 1 },
  { id: generateId(), text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 3 },
  { id: generateId(), text: 'Premature optimization is the root of all evil.', votes: 0 },
  { id: generateId(), text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 1 }
]

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'VOTE': {
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    } default:
      return state
  }
}

export default reducer