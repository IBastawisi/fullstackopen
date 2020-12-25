import React, { useState } from 'react'
export const BlogForm = ({ addBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

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

  return <form onSubmit={handleSubmit}>
    <div>
      Title: <input name='title' value={newBlog.title} onInput={handleInput} />
    </div>
    <div>
      Author: <input name='author' value={newBlog.author} onInput={handleInput} />
    </div>
    <div>
      Url: <input name='url' value={newBlog.url} onInput={handleInput} />
    </div>
    <div>
      <button type="submit">Add</button>
    </div>
  </form>

}
