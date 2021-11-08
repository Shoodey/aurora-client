import { io } from "socket.io-client";
import React, { useEffect, useState } from "react";
import Messages from "./messages";
import MessageInput from "./messageInput";

function Chat({ channel }) {
  const [socket, setSocket] = useState(
    io("http://localhost:4000", { transports: ["websocket"] })
  );
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
  });
  const [message, setMessage] = useState({
    author: "",
    content: "",
    created_at: "",
  });
  const [messages, setMessages] = useState([]);
  const [isAuthenticated, setIsAthenticated] = useState(false);

  const setUsername = (name) => {
    setUser((state) => ({
      ...state,
      name: name,
    }));
  };

  const joinChannel = (e) => {
    e.preventDefault();
    socket.emit("joinChannel", { user, channel });
    setIsAthenticated(true);
  };

  useEffect(() => {
    socket.on("message", ({ author, content, created_at }) => {
      setMessages((state) => [
        ...state,
        {
          author,
          content,
          created_at,
        },
      ]);
    });

    return () => socket.close();
  }, []);

  const sendMessage = () => {
    socket.emit("userMessage", { user, channel, message });
    setMessage({
      author: "",
      content: "",
      created_at: "",
    });
  };

  return (
    <>
      {!isAuthenticated && (
        <div>
          <h1>Identification</h1>
          <input
            type="text"
            placeholder="Your name here..."
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <p>
            Login to <strong>{channel.name}</strong> as {user.name}?
          </p>
          <button
            onClick={(e) => joinChannel(e)}
            disabled={user.name.length < 3}
          >
            Login
          </button>
        </div>
      )}
      {isAuthenticated && socket && (
        <div>
          <Messages messages={messages}></Messages>
          <MessageInput
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          ></MessageInput>
        </div>
      )}
    </>
  );
}

export default Chat;
