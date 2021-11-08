import React from "react";

function MessageInput({ setMessage, sendMessage, message }) {
  return (
    <div>
      <input
        type="text"
        value={message.content}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          } else if (e.key === "Escape") {
            setMessage({
              author: "",
              content: "",
              created_at: "",
            });
          }
        }}
      />
      <button onClick={(e) => sendMessage()}>Send</button>
    </div>
  );
}

export default MessageInput;
