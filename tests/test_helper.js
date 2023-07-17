const Blog = require('../models/blog')

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

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb
}