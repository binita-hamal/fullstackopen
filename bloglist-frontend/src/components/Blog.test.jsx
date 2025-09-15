import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import { describe, expect } from "vitest";

describe("<Blog/>", () => {
  const blog = {
    title: "react testing",
    author: "John doe",
    url: "http://google.com",
    likes: 7,
    user: { id: "124" },
  };

  test("blog component renders title and author, but donot render its URL or number of likes by default", () => {
    render(
      <Blog blog={blog} blogs={[]} setBlogs={() => {}} user={{ id: "124" }} />
    );

    const summary = screen.getByText("react testing John doe")
    expect(summary).toBeDefined()

    const url =screen.queryByText("http://google.com")
    const likes = screen.queryByText(/likes/i)

    expect(url).not.toBeInTheDocument()
    expect(likes).not.toBeInTheDocument()



  });
});
