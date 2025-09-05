import { test, describe } from "node:test";
import assert from "assert";
import { dummy, totalLikes } from "../utils/list_helper.js";

test("dummy returns one", () => {
  const blogs = [];
  const result = dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  const oneBlog = [
    {
      title: "Learning Fullstack Development",
      author: "Binit A. Hamal",
      url: "https://google.com",
      likes: 10,
    },
  ];

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

  test("total likes of empty list is zero", () => {
    const blogs = [];
    const result = totalLikes(blogs);
    assert.strictEqual(result, 0);
  });

  test("total likes of one blogs equals the likes of that", () => {
    const result = totalLikes(oneBlog);
    assert.strictEqual(result, 10);
  });

  test("total likes of many blogs equals the sum of likes", () => {
    const result = totalLikes(manyBlogs);
    assert.strictEqual(result, 53);
  });
});
