import React from "react";
import moment from "moment";
import { FaUserCircle, FaRegClock } from "react-icons/fa";

function Messages({ messages }) {
  return (
    <>
      <h1>Messages</h1>
      {messages.map((message) => {
        return (
          <div key={message.created_at}>
            <hr />
            <p>
              <strong>
                <FaUserCircle /> {message.author}
              </strong>
              <br />
              <em>
                <FaRegClock /> {moment(message.created_at).fromNow()}
              </em>
              <br />
              {message.content}
            </p>
          </div>
        );
      })}
    </>
  );
}

export default Messages;
