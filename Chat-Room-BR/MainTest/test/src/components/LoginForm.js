import React, { Component } from 'react';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname:"",
      error:""
    };
  }
  render() {
		const { nickname, error } = this.state
		return (
			<div className="login">
				<form onSubmit={this.handleSubmit} className="login-form">
			          <label
			          		htmlFor="nickname">
			          		<h1 style={{textAlign:"center"}}>
			          			Got a nickname?
			          		</h1>
			          </label>

			          <input
			          		ref={(input)=>{ this.textInput = input }}
			          		id="nickname"
			          		type="text"
			          		value={nickname}
			          		onChange={this.handleChange}
			          		placeholder={this.randomPlaceholder()}
			          		/>
			          	<div className="error">{error ? error : ""}</div>
				</form>
			</div>
		);
	}
}
