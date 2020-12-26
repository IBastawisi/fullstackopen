import { combineReducers } from 'redux'

export const initApp = (data) => {
  return {
    type: 'INIT',
    data
  }
}

export const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data
  }
}

export const vote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const announce = (announucement) => {
  return {
    type: 'ANNOUNCE',
    data: announucement
  }
}

export const clearAnnouncement = () => {
  return {
    type: 'CLEAR_ANNOUNCEMENT'
  }
}

export const filterChange = filter => {
  return {
    type: 'SET_FILTER',
    filter,
  }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data
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

const announcementReducer = (state = null, action) => {
  switch (action.type) {
    case 'ANNOUNCE':
      return action.data
    case 'CLEAR_ANNOUNCEMENT':
      return null
    default:
      return state
  }
}

const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter
    default:
      return state
  }
}

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  announcement: announcementReducer,
  filter: filterReducer
})

export default reducer