import {Component} from "react";
import React from "react";

class Messages extends Component {
  render() {
    const {messages} = this.props;
    return (
      <ul className="Messages-list">
        {messages.map(m => this.renderMessage(m))}
      </ul>
    );
  }

  renderMessage(message) {
    const {member, text} = message;
    const {currentMember} = this.props;
<<<<<<< HEAD
=======
    if (member && currentMember) {
        member.username = "yikes"
        member.color = "0xFFFFFF"
    }
    else {
      console.log("error in message.js with member");
      return (
        <div>
          <h1>loading...</h1>
        </div>
      )
    }
>>>>>>> parent of daf08e1... Small fix
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe ?
      "Messages-message currentMember" : "Messages-message";
    return (
      <li className={className}>
        <div className="Message-content">
          <div className="text">{text}</div>
        </div>
      </li>
    );
  }
}

export default Messages;
