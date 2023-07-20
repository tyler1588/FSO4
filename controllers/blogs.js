const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({}).populate('user')
        response.json(blogs)
    }

    catch(exception) {
        next(exception)
    }
    
})
  
blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    const users = await User.find({})
    const rand = Math.floor(Math.random() * users.length)
    const user = users[rand]

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id
    })
  
    try {
        const newBlog = await blog.save()
        user.blogs = user.blogs.concat(newBlog._id)
        await user.save()
        response.status(201).json(newBlog)
    }

    catch(exception) {
        next(exception)
    }
    
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    }

    catch(exception){
        next(exception)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true})
        response.status(200).end()
    }

    catch(exception) {
        next(exception)
    }
})

module.exports = blogsRouter

