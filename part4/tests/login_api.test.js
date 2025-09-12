
import supertest from "supertest"
import {test,after,describe,beforeEach} from "node:test"
import app from "../app.js"
import { User } from "../models/user.js"
import { Blog } from "../models/blog.js"
import bcrypt from "bcrypt"

const api= supertest(app)
let token=""


beforeEach(async()=>{
    await User.deleteMany({})
    await Blog.deleteMany({})
  
    const passwordHash= await bcrypt.hash("secret",10)
    const user = new User({username:"root",passwordHash})
    await user.save()
  
  
  
    const response = await api.post("/api/login")
    .send({username:"root",password:"secret"})

    token = response.body.token
  })


  test.only("with a valid token a blog can be added", async()=>{
    const newblog={
        title:"test",
        author:"tester",
        url:"test.com",
        likes:5
    }

    await api.post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newblog)
    .expect(201)
    .expect("Content-Type", /application\/json/)


    const blogsAtEnd = await Blog.find({})
    expect(blogsAtEnd).toHaveLength(1)
    expect(blogsAtEnd[0].title).toBe("test")
  })


  test.only('if token is not provided, a blog cannot be added', async()=>{
    const newBlog= {
        title:"test",
        author:"tester",
        url:"test.com",
        likes:1
    }

    await api.post("/api/blogs")
    .send(newBlog)
    .expect(401)
    .expect("Content-Type", /application\/json/)
  })


  