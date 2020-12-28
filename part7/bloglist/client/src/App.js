/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import User from './components/User'
import blogService from './services/blogs'
import userService from './services/users'
import { Announcer } from './components/Announcer'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import { BlogForm } from './components/BlogForm'

import { Switch, Route, Link, useHistory, useParams, Redirect, useLocation } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { actions } from './store'

import { Button, CircularProgress, Drawer, DrawerHeader, DrawerTitle, DrawerSubtitle, DrawerContent, List, ListItem, DrawerAppContent, Fab } from 'rmwc'

import { SimpleTopAppBar, TopAppBar, TopAppBarTitle, TopAppBarRow, TopAppBarSection, TopAppBarActionItem, TopAppBarNavigationIcon, TopAppBarFixedAdjust } from '@rmwc/top-app-bar'
import '@rmwc/icon/icon.css'
import '@rmwc/circular-progress/styles'
import '@rmwc/circular-progress/styles'
import '@rmwc/top-app-bar/styles'
import '@rmwc/drawer/styles'
import '@rmwc/list/styles'
import '@rmwc/button/styles'
import '@rmwc/fab/styles'
import '@rmwc/theme/styles'
import './App.css'

function About() {
  return <div>
    <h2>About</h2>
    <p>Blog List App</p>
  </div>
}

const Blogs = ({ blogs }) => {
  return <div>
    <h2>All Blogs</h2>
    <List>
      {blogs.map(b => <ListItem key={b.id} tag={Link} to={`/blogs/${b.id}`}>{b.title}</ListItem>)}
    </List>
  </div>
}

const Users = ({ users }) => {
  return <div>
    <h2>Users</h2>
    <List>
      {users.map(u => <ListItem key={u.username} tag={Link} to={`/users/${u.username}`}>{u.name} has {u.blogs.length} blogs</ListItem>)}
    </List>
  </div>
}

const App = () => {
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const loading = useSelector(state => state.ui.loading)
  const announcement = useSelector(state => state.ui.announcement)
  const blogs = useSelector(state => state.blogs.slice().sort((a, b) => b.likes - a.likes))
  const dispatch = useDispatch()
  const history = useHistory()
  const  location = useLocation()

  useEffect(async () => {
    const blogs = await blogService.getAll()
    dispatch(actions.blogs.load(blogs))
    const users = await userService.getAll()
    dispatch(actions.users.load(users))

    dispatch(actions.ui.setLoading(false))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedinUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(actions.user.load(user))
      blogService.setToken(user.token)
    }
  }, [])

  const logout = () => {
    window.localStorage.removeItem('loggedinUser')
    blogService.setToken('')
    dispatch(actions.user.load(null))
    dispatch(actions.ui.announce('Logged out!'))
  }

  const [drawerOpen, setDrawerOpen] = React.useState(true)

  return <div>
    <TopAppBar fixed>
      <TopAppBarRow>
        <TopAppBarSection>
          <TopAppBarNavigationIcon icon="menu" onClick={() => setDrawerOpen(!drawerOpen)} />
          <TopAppBarTitle>Blogs</TopAppBarTitle>
        </TopAppBarSection>
        <TopAppBarSection alignEnd>
          {!user && <Button label="Login" theme='onPrimary' outlined icon="login" tag={Link} to='/login' />}
          {user && <div>
            <span style={{ padding: '0 1rem' }}>Welcome, {user.name}</span>
            <Button label="Logout" theme='onPrimary' outlined onClick={logout} />
          </div>}
        </TopAppBarSection>
      </TopAppBarRow>
    </TopAppBar>
    <TopAppBarFixedAdjust />

    <div style={{ overflow: 'hidden', position: 'relative', minHeight: 'calc(100vh - 64px)' }}>
      <Drawer dismissible open={drawerOpen}>
        <DrawerContent>
          <List>
            <ListItem activated={location.pathname === '/'} tag={Link} to="/">Home</ListItem>
            <ListItem activated={location.pathname === '/users'} tag={Link} to="/users">Users</ListItem>
            <ListItem activated={location.pathname === '/about'} tag={Link} to="/about">About</ListItem>
          </List>
        </DrawerContent>
      </Drawer>
      <DrawerAppContent
        style={{ minHeight: '15rem', padding: '1rem' }}
      >
        <Switch>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/register">
            <RegisterForm />
          </Route>
          <Route path="/create">
            {user ? <BlogForm /> : loading ? <CircularProgress /> : <Redirect to='/login' />}
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users/:username">
            {users ? <User /> : <CircularProgress />}
          </Route>
          <Route path="/blogs/:id">
            {loading ? <CircularProgress /> : <Blog />}
          </Route>
          <Route path="/users">
            {users ? <Users users={users} /> : <CircularProgress />}
          </Route>
          <Route path="/">
            {loading ? <CircularProgress /> : <>
              <Blogs blogs={blogs} />
              {user && <Fab label='Create' icon='add' tag={Link} to='/create' style={{ position: 'fixed', bottom: 32, right: 32 }} />}
            </>}
          </Route>
        </Switch>
      </DrawerAppContent>
    </div>
    <nav>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      </div>
    </nav>
    <Announcer {...{ announcement }} />
  </div>

}

export default App