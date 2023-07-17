const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
        "title": "Test",
        "author": "Test Author",
        "url": "www.test.com",
        "likes": 10
    },
    {
        "title": "Test 2",
        "author": "Test Author 2",
        "url": "www.test2.com",
        "likes": 20
    },
  ]
  

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)

})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('blog id is correctly named', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => expect(blog.id).toBeDefined())
})


test('can add a blog to the database', async () => {

  const blogsAtBeginning = await api.get('/api/blogs')
  const newBlog = {
    "title": "Test",
    "author": "Test Author",
    "url": "www.test.com",
    "likes": 10
  }

  await api.post('/api/blogs').send(newBlog)

  const blogsAtEnd = await api.get('/api/blogs')
  expect(blogsAtEnd.body).toHaveLength(blogsAtBeginning.body.length + 1)
})

afterAll(async () => {
  await mongoose.connection.close()
})