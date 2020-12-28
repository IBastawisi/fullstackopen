import { configureStore, createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  users: [],
  blogs: [],
  ui: { loading: true, announcement: null }
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState.user,
  reducers: {
    load: (state, action) => action.payload

  }
})

const usersSlice = createSlice({
  name: 'users',
  initialState: initialState.users,
  reducers: {
    load: (state, action) => action.payload

  }
})

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: initialState.blogs,
  reducers: {
    load: (state, action) => action.payload,
    add: (state, action) => {
      state.push(action.payload)
    },
    update: (state, action) => {
      return state.map(b => b.id === action.payload.id ? action.payload : b)
    },
    delete: (state, action) => state.filter(b => b.id !== action.payload),
  }
})

const uiSlice = createSlice({
  name: 'ui',
  initialState: initialState.ui,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    announce: (state, action) => {
      state.announcement = action.payload
    },
    clearAnnouncement: (state) => {
      state.announcement = null
    }

  }
})

const reducer = {
  user: userSlice.reducer,
  users: usersSlice.reducer,
  blogs: blogsSlice.reducer,
  ui: uiSlice.reducer,
}

export const actions = {
  user: userSlice.actions,
  users: usersSlice.actions,
  blogs: blogsSlice.actions,
  ui: uiSlice.actions,
}

const store = configureStore({ reducer })

export default store