import { Blog } from "../models/blog.js";
import mongoose from "mongoose";
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
      _id: 1,
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

export const updateBlogs = async (req, res) => {
  try {
    const id = req.params.bid;
    const body = req.body;

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: body.user,
    };

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

export const deleteBlogs = async (req, res) => {
  try {
    console.log("Request User:", req.user);
    console.log("Blog ID:", req.params.id);

    if (!req.user) {
      return res.status(401).json({ error: "unauthorized" });
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "invalid blog ID" });
    }

    const blog = await Blog.findById(req.params.id).populate("user");
    console.log("Blog Found:", blog);

    if (!blog) {
      return res.status(404).json({ error: "blog not found" });
    }

    const blogUserId = blog.user ? blog.user._id.toString() : null;
    const reqUserId = req.user ? req.user._id.toString() : null;

    console.log("Blog User ID:", blogUserId);
    console.log("Request User ID:", reqUserId);

    if (blogUserId !== reqUserId) {
      return res
        .status(403)
        .json({ error: "only creator can delete the blog" });
    }

    await Blog.findByIdAndDelete(req.params.id);
    console.log("Blog deleted successfully");
    res.status(204).end();
  } catch (error) {
    console.error("Error in deleteBlogs:", error);
    res.status(500).json({ error: "something went wrong" });
  }
};
