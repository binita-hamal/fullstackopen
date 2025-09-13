import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login.js";
import BlogForm from "./components/BlogForm.jsx";
import Notification from "./components/Notification.jsx";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [user, setUser] = useState(null);

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [notification,setNotification] = useState("")

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedUser");

    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const showNotification = (message)=>{
    setNotification(message)
    setTimeout(()=> setNotification(""),5000)
  }



  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      localStorage.setItem("loggedUser", JSON.stringify(user));

      setUser(user);
      blogService.setToken(user.token);
      setUserName("");
      setPassword("");
      
      showNotification(`Welcome ${user.name}!`)
    } catch (error) {
      console.log(error);
      showNotification(`wrong username or password`)
    }
  }

  function handleLogOut() {
    localStorage.removeItem("loggedUser");
    setUser(null);
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        <Notification message={notification}/>

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
            <button>login</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={notification}/>

      <p>{user.name} logged in</p>

      <button onClick={handleLogOut}>log out</button>

      <BlogForm addBlog={(blog) => {

      setBlogs(blogs.concat(blog))
      showNotification(`a new blog ${blog.title} by ${blog.author} added`)
      }
      } />

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
