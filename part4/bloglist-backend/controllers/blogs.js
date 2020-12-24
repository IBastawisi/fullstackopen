const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const blog = new Blog({ ...body })

  const savedBlog = await blog.save()
  response.json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const id = request.params.id
  const blog = { ...body }

  const updated = await Blog.findByIdAndUpdate(id, blog, { new: true, runValidators: true, context: 'query' })
  response.json(updated)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter