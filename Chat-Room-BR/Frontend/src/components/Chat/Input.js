import {Component} from "react";
import React from "react";
import { withFirebase } from '../Firebase';
import config from '../Firebase';
import * as firebase from 'firebase';

class Input extends Component {
  state = {
    text: "",
    userdata: ""
  }

  onChange(e) {
    this.setState({text: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({text: ""});
    this.props.onSendMessage(this.state.userdata.name + ": " + this.state.text);
  }

  render() {
    var user = firebase.auth().currentUser;
    if (user && !this.state.userdata) {
      this.props.firebase.user(user.uid).on('value', snapshot => {
        //  console.log(snapshot.val());
        this.setState({
          userdata: snapshot.val(),
          loading: false,
        });
      });
    }
    return (
      <div className="Input">
      <form onSubmit={e => this.onSubmit(e)}>
      <input
      onChange={e => this.onChange(e)}
      value={this.state.text}
      type="text"
      placeholder="Enter your message and press ENTER"
      autoFocus={true}
      />
      <button>Send</button>
      </form>
      </div>
    );
  }
}

export default withFirebase(Input);
