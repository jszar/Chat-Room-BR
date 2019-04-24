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
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe ?
      "Messages-message currentMember" : "Messages-message";
    return (
      <li className={className}>
      <span
        className="avatar"
        style={{backgroundColor: member.clientData.color}}
      />
        <div className="Message-content">
          <div className="name">
            {member.clientData.name}
          </div>
          <div className="text">{text}</div>
        </div>
      </li>
    );
  }
}

export default Messages;
