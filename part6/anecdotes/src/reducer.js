import { combineReducers } from 'redux'
import service from './service'

export const initApp = () => {
  return async dispatch => {
    const data = await service.getAll()
    dispatch({
      type: 'INIT',
      data
    })
  }
}

export const createAnecdote = (text) => {
  return async dispatch => {
    const data = await service.createNew(text)
    dispatch({
      type: 'NEW_ANECDOTE',
      data
    })
  }
}

export const vote = (object) => {
  return async dispatch => {
    const data = await service.update({ ...object, votes: +object.votes + 1 })
    dispatch({
      type: 'VOTE',
      data
    })
  }
}

export const announce = (announucement, timeout = 3000) => {
  return async dispatch => {
    dispatch({
      type: 'ANNOUNCE',
      data: announucement
    })

    await new Promise(resolve => setTimeout(resolve, timeout))
    dispatch(clearAnnouncement())
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
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : action.data
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