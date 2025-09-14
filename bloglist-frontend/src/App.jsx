import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login.js';
import BlogForm from './components/BlogForm.jsx';
import Notification from './components/Notification.jsx';
import LoginForm from './components/LoginForm.jsx';
import Togglable from './components/Togglable.jsx'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [notification, setNotification] = useState("");

  const blogFormRef = useRef();

  // useEffect(() => {
  //   blogService.getAll().then((blogs) => setBlogs(blogs));
  // }, []);

  //sorted likes in descending order
  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const sorted = blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(sorted);
    });
  }, []);

  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedUser");

    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 5000);
  };

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      const userToSave = {
        token: user.token,
        username: user.username,
        name: user.name,
        id: user.id,
      };

      localStorage.setItem("loggedUser", JSON.stringify(userToSave));

      setUser(userToSave);
      blogService.setToken(userToSave.token);
      setUserName("");
      setPassword("");

      showNotification(`Welcome ${user.name}!`);
    } catch (error) {
      console.log(error);
      showNotification(`wrong username or password`);
    }
  }

  function handleLogOut() {
    localStorage.removeItem("loggedUser");
    setUser(null);
  }

  if (user === null) {
    return (
      <div>
        <Notification message={notification} />

        <Togglable buttonLabel="log in">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={(e) => setUserName(e.target.value)}
            handlePasswordChange={(e) => setPassword(e.target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={notification} />

      <span style={{ marginRight: "20px" }}>{user.name} logged in</span>
      <button onClick={handleLogOut} style={{ marginBottom: "20px" }}>
        log out
      </button>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm
          addBlog={(blog) => {
            blogFormRef.current.toggleVisibility(); //hide after creating a blog
            setBlogs(blogs.concat(blog));
            showNotification(
              `a new blog ${blog.title} by ${blog.author} added`
            );
          }}
        />
      </Togglable>

      {blogs.map((blog) => (
        <Blog
          user={user}
          blogs={blogs}
          setBlogs={setBlogs}
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  );
};

export default App;
