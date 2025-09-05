import { test, after, describe, before } from "node:test";
import assert from "assert";
import mongoose from "mongoose";
import supertest from "supertest";
import { Blog } from "../models/blog.js";
import app from "../app.js";

const api = supertest(app);


before(async()=>{
    const MONGODB = process.env.TEST_MONGO_URL
    await mongoose.connect(MONGODB)
})

after(async () => {
    await mongoose.connection.close();
  });




describe("blog get method", () => {
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

  before(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(manyBlogs);
  });

  test.only("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test.only("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, manyBlogs.length);
  });

  test.only("unique identifier of the blog posts returns named id", async () => {
    const response = await api.get("/api/blogs");
    response.body.forEach((blog) => {
      assert.ok(blog.id);
      assert.strictEqual(blog._id, undefined);
    });
  });

});



describe("blog post method", async () => {
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

  before(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(manyBlogs);
  });

  test.only("a blog can be added", async () => {
    let blog = {
      title: "digital technology",
      author: "hari",
      url: "https://youtube.com",
      likes: 90,
    };

    await api
      .post("/api/blogs")
      .send(blog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAdded = await Blog.find({});
    assert.strictEqual(blogsAdded.length, manyBlogs.length + 1);

    const title = blogsAdded.map((b) => b.title);
    assert.ok(title.includes("digital technology"));
  });

});
