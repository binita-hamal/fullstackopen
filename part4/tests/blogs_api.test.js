import { test, after, describe, before,beforeEach } from "node:test";
import assert from "node:assert";
import mongoose from "mongoose";
import supertest from "supertest";
import { Blog } from "../models/blog.js";
import { User } from "../models/user.js";
import dotenv from "dotenv"
import bcrypt from "bcrypt"

import app from "../app.js";
dotenv.config()

const api = supertest(app);

const manyBlogs = [
  {
    title: "Learning Fullstack Development",
    author: "Binit A. Hamal",
    url: "https://myblog.com/learning-fullstack",
    likes: 10,
  },
  {
    title: "Understanding React Hooks",
    author: "Jane Doe",
    url: "https://myblog.com/react-hooks",
    likes: 25,
  },
  {
    title: "Mastering Node.js",
    author: "John Smith",
    url: "https://myblog.com/nodejs-mastery",
    likes: 18,
  },
];


let token
before(async()=>{
  const MONGODB = process.env.TEST_MONGO_URL
  await mongoose.connect(MONGODB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    serverSelectionTimeoutMS:30000,
  })
})
  beforeEach(async()=>{
    await User.deleteMany({})
    await Blog.deleteMany({})

    const passwordHash = await bcrypt.hash('secret',10)
    const user = new User({username:"root",passwordHash})
    await user.save()

    const loginResponse = await api.post("/api/login")
    .send({username:"root",password:"secret"})

    token = loginResponse.body.token

    const blogObj = manyBlogs.map(b => new Blog({...b, user: user._id}))


    await Blog.insertMany(blogObj)

  })













describe("blog get method", async() => {


  // beforeEach(async () => {
  //   await Blog.deleteMany({});
  //   await Blog.insertMany(manyBlogs);
  // });






  test("blogs are returned as json", async () => {
    const response =  await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

      const blogs = response.body
      assert.strictEqual(blogs.length,manyBlogs.length)

      blogs.forEach((b)=>{
        assert.ok(b.id)
        assert.strictEqual(b._id,undefined)
      })
  });


  // test("all blogs are returned", async () => {
  //   await Blog.insertMany(manyBlogs);
  //   const response = await api.get("/api/blogs");
  //   assert.strictEqual(response.body.length, manyBlogs.length);
  // });

  // test("unique identifier of the blog posts returns named id", async () => {
  //   const response = await api.get("/api/blogs");
  //   response.body.forEach((blog) => {
  //     assert.ok(blog.id);
  //     assert.strictEqual(blog._id, undefined);
  //   });
  // });

});



describe("blog post method", async () => {



 




  test("a blog can be added", async () => {
    let blog = {
      title: "digital technology",
      author: "hari",
      url: "https://youtube.com",
      likes: 90,
    };

    // const blogsAtStart = await Blog.find({})

    await api
      .post("/api/blogs")
      .set("Authorization",`Bearer ${token}`)
      .send(blog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await Blog.find({});
    // assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1);
    assert.strictEqual(blogsAtEnd.length,manyBlogs.length + 1);
    // assert.strictEqual(blogsAtEnd[0].title, "digital technology")


    const title = blogsAtEnd.map((b) => b.title);
    assert.ok(title.includes("digital technology"));

  });

  test("without token, a blog cannot be addded", async()=>{
    let blog = {
      title: "digital technology",
      author: "hari",
      url: "https://youtube.com",
      likes: 90,
    };

    await api.post("/api/blogs")
    .send(blog)
    .expect(401)
    .expect("Content-Type", /application\/json/)
    
  })


  test('verifies if the like property is missing from the request',async()=>{
    let blog = {
        title: "digital technology",
        author: "hari",
        url: "https://youtube.com",
      };

      // const response = await api.post('/api/blogs')
      // .send(blog)
      // .expect(201)
      // .expect("Content-Type",/application\/json/)
      const response = await api
      .post("/api/blogs")
      .set("Authorization",`Bearer ${token}`)
      .send(blog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

      assert.strictEqual(response.body.likes,0)

  })

  test('if title or url are missing, returns the status code 400 Bad Request',async()=>{
    let noTitleBlog = {
        author: "hari",
        url: "https://youtube.com",
      };

      let noUrlBlog = {
        title: "digital technology",
        author: "shyam",
      };

      await api
      .post("/api/blogs")
      .set("Authorization",`Bearer ${token}`)
      .send(noTitleBlog)
      .expect(400)

      await api
      .post("/api/blogs")
      .set("Authorization",`Bearer ${token}`)
      .send(noUrlBlog)
      .expect(400)
     



      // await api.post('/api/blogs')
      // .send(noTitleBlog).expect(400)

      // await api.post('/api/blogs')
      // .send(noUrlBlog).expect(400)


  })

});


describe("blog delete method",()=>{
  let deleteBlog;
  beforeEach(async()=>{
    let blog = new Blog({
      title: "technology",
      author: "sita",
      url: "https://youtube.com",
      likes: 9,
    });

    const response = await api.post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(blog)
    .expect(201)

    deleteBlog = response.body

  })

  test("succeeds if user is authorized", async()=>{
    await api.delete(`/api/blogs/${deleteBlog.id}`)
    .set("Authorization",`Bearer ${token}`)
    .expect(204)

    const bloginDB = await Blog.find({})
    const ids = bloginDB.map(b => b.id)
    assert.ok(!ids.includes(deleteBlog.id))
  })



  test("fails if not authorizsed", async()=>{
    await api.delete(`/api/blogs/${deleteBlog.id}`) 
    .expect(401)

    const bloginDB = await Blog.find({})
    const ids = bloginDB.map(b => b.id)
    assert.ok(ids.includes(deleteBlog.id))

      
       

    })
  })





describe("blog put method",async()=>{
    test('blogs likes can be updated', async()=>{
        let blog = new Blog({
            title: "technology",
            author: "sita",
            url: "https://youtube.com",
            likes: 9,
          });

        const saveBlog = await blog.save()
        const updateLike = {
            likes :12
        }

        const response = await api.put(`/api/blogs/${saveBlog.id}`)
        .send(updateLike)
        .expect(200)
        .expect('Content-Type',/application\/json/)

        assert.strictEqual(response.body.likes,12)


        const bloginDB= await Blog.findById(saveBlog.id)
        assert.strictEqual(bloginDB.likes,12)

    })
})




after(async () => {
  await mongoose.connection.close();
});

