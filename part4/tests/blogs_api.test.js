import { test, after ,describe,before} from "node:test";
import assert from "assert";
import mongoose from "mongoose";
import supertest from "supertest";
import { Blog } from "../models/blog.js";
import app from "../index.js";

const api = supertest(app);

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

  before(async()=>{
    await Blog.deleteMany({})
    await Blog.insertMany(manyBlogs)
  })

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

  after(async () => {
    await mongoose.connection.close();
  });
});
