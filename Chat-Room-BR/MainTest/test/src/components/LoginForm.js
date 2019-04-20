import React, { Component } from 'react';
import { VERIFY_USER } from '../Events'

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname:"",
      error:""
    };
  }

  setUser = ({user, isUser}) => {
    console.log(user, isUser)
    if (isUser) {
      this.setError("User name taken!! :(")
    } else {
      this.props.setUser(user)
    }
  }

  handleSubmit = (e)=>{
    e.preventDefault()
    const { socket } = this.props
    const { nickname } = this.state
    socket.emit(VERIFY_USER, nickname, this.setUser)
  }

  setError = (error) => {
    this.setState({error})
  }

  handleChange = (e)=> {
    this.setState({nickname:e.target.value})
  }
  render() {
		const { nickname, error } = this.state
		return (
			<div className="login">
				<form onSubmit={this.handleSubmit} className="login-form">
			          <label htmlFor="nickname">
			          		<h2>Enter a nickname pussy</h2>
			          </label>

			          <input
			          		ref={(input)=>{ this.textInput = input }}
			          		id="nickname"
			          		type="text"
			          		value={nickname}
			          		onChange={this.handleChange}
			          		placeholder={'hi :)'}
			          		/>
			          	<div className="error">{error ? error : ""}</div>
				</form>
			</div>
		);
	}
}
