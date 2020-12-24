const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs id is defined', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToView = blogsAtStart[0]
  expect(blogToView.id).toBeDefined()
})

test('a new blog can be added', async () => {
  const newBlog = {
    title: 'personal blog',
    author: 'ibastawisi',
    url: 'https://ibastawisi.ml/'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(n => n.title)
  expect(titles).toContain(
    'personal blog'
  )
})

test('if the likes property is missing from the request, it will default to the value 0.', async () => {
  const newBlog = {
    title: 'new blog',
    url: 'https://ibastawisi.github.io/',
  }

  const result = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(result.body.likes).toBe(0)
})

test('blog without title/url is not added', async () => {
  const noTitle = {
    url: 'https://ibastawisi.github.io/',
  }

  await api
    .post('/api/blogs')
    .send(noTitle)
    .expect(400)

  const noUrl = {
    title: 'new blog',
  }

  await api
    .post('/api/blogs')
    .send(noUrl)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})