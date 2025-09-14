function Notification({ message }) {
  if (!message) return null;
  return (
    <div
      style={{
        border: "1px solid green",
        padding: 10,
        marginBottom: 10,
        backgroundColor: "gray",
      }}
    >
      {message}
    </div>
  );
}

export default Notification;
