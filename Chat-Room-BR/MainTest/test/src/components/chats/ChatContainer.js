import React, { Component } from 'react';
import SideBar from './SideBar'

export default class ChatContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chats:[],
      activeChat:null,
    };
  }

  componentDidMount() {
    const { socket } = this.props
  }

  sendMessage = (chatId, message) => {
    const { socket } = this.props
    socket.emit(MESSAGE_SENT, {chatID, message})
  }

  sendTyping = (chatId, isTyping) => {
    const { socket } = this.props
    socket.emit(TYPING, {chatId, isTyping})
  }

  setActiveChat = (activeChat) => {
    this.setState({activeChat})
  }

  render() {
		const { user, logout } = this.props
		const { activeChat, chats } = this.state
		return (
			<div className="container">
				<SideBar
					logout={logout}
					chats={chats}
					user={user}
					activeChat={activeChat}
					setActiveChat={ (chat)=> this.setActiveChat(chat) }/>

				<div className="chat-room-container">
					{
						activeChat !== null ? (
							<div className="chat-room">
								<ChatHeading
									name={activeChat.name}
									online={true} />
								<Messages
									messages={activeChat.messages}
									user={user}
									typingUsers={activeChat.typingUsers}/>

								<MessageInput
									sendMessage={
										(message)=>{
											this.sendMessage(activeChat.id, message)
										}
									}
									sendTyping={
										(isTyping)=>{
											this.sendTyping(activeChat.id, isTyping)
										}
									}
									/>
							</div>
            )
            :
							<div className="chat-room choose">
								<h3>Choose a chat</h3>
							</div>
					}
				</div>
			</div>
		);
	}
}
