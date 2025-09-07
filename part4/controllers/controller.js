import { Blog } from "../models/blog.js";
import { User } from "../models/user.js";
import jwt, { decode } from "jsonwebtoken";

export const getBlogs = async (req, res) => {
  try {
    // Blog.find({}).then((blogs) => {
    //   res.json(blogs);
    // });

    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });

    res.json(blogs);
  } catch (error) {
    console.log(error);
  }
};

export const postBlogs = async (req, res) => {
  try {
    const { title, author, url, likes } = req.body;
    const user = req.user;

    // if (!title || !url) {
    //   return res.status(400).json({ error: "title or url missing" });
    // }

    if (!user) {
      return res.status(401).json({ error: "token invalid or missing" });
    }

    const newBlog = new Blog({
      title,
      author,
      url,
      likes: likes || 0,
      user: user._id,
    });

    const savedBlog = await newBlog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    console.log(error);
  }
};

export const deleteBlogs = async (req, res) => {
  const user = req.user;
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({ error: "blog not found" });
  }

  if (blog.user.toString() !== decodedToken.id.toString()) {
    return res.status(403).json({ error: "only creater can delete the blog" });
  }

  await Blog.findByIdAndRemove(req.params.id);
  res.status(204).end();

  // const id = req.params.bid;
  // const deleteBlog = await Blog.findByIdAndDelete(id);

  // if (!deleteBlog) {
  //   return res.status(404).json({ error: "Blog not found" });
  // }
  // res.status(204).end();

  // if(!decodedToken.id){
  //   return res.status(401).json({error:"token missing or invalid"})
  // }
};

export const updateBlogs = async (req, res) => {
  try {
    const id = req.params.bid;
    const body = req.body;

    const update = await Blog.findByIdAndUpdate(id, body, { new: true });

    if (update) {
      res.json(update);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    console.log(error);
  }
};
