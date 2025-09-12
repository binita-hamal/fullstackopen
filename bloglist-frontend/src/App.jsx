import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login.js"

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [user, setUser] = useState(null);

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);


  async function handleSubmit(e){
    e.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })

      setUser(user)
      setUserName("")
      setPassword("")
      
    } catch (error) {
      console.log(error)
      
    }
  }


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label>
              username:
              <input
              type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </label>
          </div>

          <label>
            password:{" "}
            <input
            type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <div>
            <button

            >login</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
