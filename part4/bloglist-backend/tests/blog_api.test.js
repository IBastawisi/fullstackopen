const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
let token
// const User = require('../models/user')

const getAuthToken = async () => {
  const result = await api
    .post('/api/login')
    .send({
      username: 'test',
      password: 'secret'
    })

  return `Bearer ${result.body.token}`
}

describe('blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }

    token = await getAuthToken()
  })

  describe('read blogs', () => {
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
  })

  describe('create blog', () => {
    test('add blog only if authenticated', async () => {
      const newBlog = {
        title: 'personal blog',
        author: 'Superuser',
        url: 'https://ibastawisi.ml/'
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
    })

    test('a new blog can be added if authenticated', async () => {
      const newBlog = {
        title: 'personal blog',
        author: 'Superuser',
        url: 'https://ibastawisi.ml/'
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', token)
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
        .set('Authorization', token)
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
        .set('Authorization', token)
        .expect(400)

      const noUrl = {
        title: 'new blog',
      }

      await api
        .post('/api/blogs')
        .send(noUrl)
        .set('Authorization', token)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
  })

  describe('update blog', () => {
    test('succeeds with status code 200 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      const updatedBlog = { ...blogToUpdate, likes: 64 }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      const blogToView = blogsAtEnd[0]

      expect(blogToView.likes).toBe(64)
    })
  })

  describe('delete blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {

      const newBlog = {
        title: 'blogToDelete',
        author: 'test',
        url: 'https://ibastawisi.ml/'
      }

      const deleteReq = await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', token)
      const blogToDelete = deleteReq.body

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', token)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length
      )

      const ids = blogsAtEnd.map(r => r.id)

      expect(ids).not.toContain(blogToDelete.id)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})