import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import { Announcer } from './components/Announcer'
import './App.css'
import { BlogForm } from './components/BlogForm'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [announcement, setAnnouncement] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedinUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedinUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setAnnouncement({
        message: 'wrong credentials',
        style: 'error'
      })
      setTimeout(() => {
        setAnnouncement(null)
      }, 3000)
    }
  }

  const handleNewBlogInput = event => {
    const { name, value } = event.target
    setNewBlog({ ...newBlog, [name]: value })
  }

  const addNewBlog = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.create(newBlog)
      setAnnouncement({
        message: `Blog ${blog.title} has been added`,
        style: 'success'
      })
      setTimeout(() => {
        setAnnouncement(null)
      }, 3000)

      setNewBlog({
        title: '',
        author: '',
        url: ''
      })
      setBlogs(blogs.concat(blog))
    } catch (exception) {
      setAnnouncement({
        message: exception.response.data.error,
        style: 'error'
      })
      setTimeout(() => {
        setAnnouncement(null)
      }, 5000)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedinUser')
    blogService.setToken('')
    setUser(null)

    setAnnouncement({
      message: 'Logged out!',
      style: 'info'
    })
    setTimeout(() => {
      setAnnouncement(null)
    }, 3000)
  }


  if (user === null) {
    return <div>
      <h1>Login to app</h1>
      <Announcer {...{ announcement }} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>

    </div>
  }
  return (
    <div>
      <Announcer {...{ announcement }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>blogs</h2>
        <div>
          <span>{user.name} logged-in</span>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
      <BlogForm blog={newBlog} handleInput={handleNewBlogInput} addBlog={addNewBlog} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App