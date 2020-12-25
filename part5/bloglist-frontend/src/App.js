import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import { Announcer } from './components/Announcer'
import './App.css'
import LoginForm from './components/LoginForm'
import { BlogForm } from './components/BlogForm'
import Collapsible from './components/Collapsible'

const App = () => {
  const [user, setUser] = useState(null)
  const [announcement, setAnnouncement] = useState(null)
  const [blogs, setBlogs] = useState([])
  const blogFormRef = useRef()

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

  const handleLogin = async loginForm => {
    try {
      const user = await loginService.login(loginForm)
      window.localStorage.setItem(
        'loggedinUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
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

  const addBlog = async (newBlog) => {
    try {
      const blog = await blogService.create(newBlog)
      blogFormRef.current.toggleVisibility()
      setAnnouncement({
        message: `Blog ${blog.title} has been added`,
        style: 'success'
      })
      setTimeout(() => {
        setAnnouncement(null)
      }, 3000)

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

  const addLike = async (old) => {
    try {
      const blog = await blogService.update(old.id, { likes: old.likes + 1 })
      setBlogs(blogs.map(b => b.id === old.id? blog: b))
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

  const deleteBlog = async id => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(b => b.id !== id))
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


  return <div>
    <Announcer {...{ announcement }} />
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <h2>Blogs</h2>
      {!user &&
        <Collapsible label="Login" onLabel='Cancel'>
          <LoginForm login={handleLogin} />
        </Collapsible>
      }
      {user && <div>
        <span>{user.name} logged-in</span>
        <button onClick={logout}>Logout</button>
      </div>}
    </div>
    {user && <Collapsible label="Add new Blog" onLabel='Cancel' ref={blogFormRef}>
      <BlogForm addBlog={addBlog} />
    </Collapsible>}
    {blogs.map(blog => <Blog key={blog.id} blog={blog} addLike={addLike} deleteBlog={user?.username === blog.user.username && deleteBlog }/>)}
  </div>
}

export default App