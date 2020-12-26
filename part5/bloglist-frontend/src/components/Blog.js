import React from 'react'
import Collapsible from './Collapsible'
const Blog = ({ blog, addLike, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleDelete = async () => {
    const res = window.confirm(`Are you sure to permenantly remove ${blog.title}?`)
    if (res) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title} by {blog.author}
      </div>
      <Collapsible label='View' onLabel='Hide'>
        <div>
          <p>Title: {blog.title}</p>
          <p>Author: {blog.author}</p>
          <p>Url: <a href={blog.url} target='_blanck'>{blog.url}</a></p>
          <p>Likes: <span className='like-count'>{blog.likes}</span> <button onClick={() => addLike(blog)}>Add like</button></p>
        </div>
      </Collapsible>
      {deleteBlog && <button onClick={handleDelete}>DELETE Blog</button>}
    </div>
  )
}

export default Blog