import Notification from "./Notification";
function LoginForm({
  username,
  password,
  notification,
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
}) {
  return (
    <div>
      <div>
        <h2>Log in to application</h2>

        <Notification message={notification} />

        <form onSubmit={handleSubmit}>
          <div>
            <label>
              username:
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
              />
            </label>
          </div>

          <label>
            password:{" "}
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>

          <div>
            <button>login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
