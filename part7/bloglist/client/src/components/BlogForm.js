import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { actions } from '../store'
import blogService from '../services/blogs'

import { TextField } from '@rmwc/textfield'
import '@rmwc/textfield/styles'
import { Button } from 'rmwc'
import { useHistory } from 'react-router-dom'

export const BlogForm = () => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  const dispatch = useDispatch()
  const history = useHistory()

  const handleInput = event => {
    const { name, value } = event.target
    setNewBlog({ ...newBlog, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    addBlog(newBlog)
    setNewBlog({
      title: '',
      author: '',
      url: ''
    })
  }

  const addBlog = async (newBlog) => {
    try {
      const blog = await blogService.create(newBlog)
      dispatch(actions.ui.announce(`Blog ${blog.title} has been added`))
      dispatch(actions.blogs.add(blog))
      history.push('/')
    } catch (exception) {
      dispatch(actions.ui.announce(exception.response.data.error))
    }
  }

  return <div className='form-container'>
    <h2>Create new Blog</h2><form onSubmit={handleSubmit}>
      <TextField
        name='title'
        value={newBlog.title}
        onChange={handleInput}
        label='Title' />
      <TextField
        name='author'
        value={newBlog.author}
        onChange={handleInput}
        label='Author' />
      <TextField
        name='url'
        value={newBlog.url}
        onChange={handleInput}
        label='Url' />

      <Button type="submit" label='Add' style={{ margin: 16 }} />
    </form >
  </div>

}
