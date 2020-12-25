import React from 'react'
export const BlogForm = ({ blog, handleInput, addBlog }) =>
    <form onSubmit={addBlog}>
        <div>
            Title: <input name='title' value={blog.title} onInput={handleInput} />
        </div>
        <div>
            Author: <input name='author' value={blog.author} onInput={handleInput} />
        </div>
        <div>
            Url: <input name='url' value={blog.url} onInput={handleInput} />
        </div>
        <div>
            <button type="submit">Add</button>
        </div>
    </form>
