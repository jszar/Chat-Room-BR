import React from 'react';

const Chat = () => (
  <div>
    <div>
      <meta charSet="UTF-8"/>
      <title>Socket.IO Chat Example</title>
      <link rel="stylesheet" href="style.css"/>
    </div>
    <div>
      <ul className="pages">
        <li className="chat page">
          <div className="chatArea">
            <ul className="messages"></ul>
          </div>
          <input className="inputMessage" placeholder="Type here..."/>
        </li>
        <li className="login page">
          <div className="form">
            <h3 className="title">What's your nickname?</h3>
            <input className="usernameInput" type="text" maxLength="14"/>
          </div>
        </li>
      </ul>
      <script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
      <script src="/socket.io/socket.io.js"></script>
      <script src="/main.js"></script>
    </div>
  </div>
);

export default Chat;
