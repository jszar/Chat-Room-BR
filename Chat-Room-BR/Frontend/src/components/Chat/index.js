import React, { Component } from 'react';
import './Roblox.css';
import Messages from "./Messages";
import Input from "./Input";
import { withFirebase } from '../Firebase';
import config from '../Firebase';
import * as firebase from 'firebase';
import { Redirect } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

function randomName() {
  const adjectives = [
    "autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark",
    "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter",
    "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue",
    "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long",
    "late", "lingering", "bold", "little", "morning", "muddy", "old", "red",
    "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering",
    "withered", "wild", "black", "young", "holy", "solitary", "fragrant",
    "aged", "snowy", "proud", "floral", "restless", "divine", "polished",
    "ancient", "purple", "lively", "nameless"
  ];
  const nouns = [
    "waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning",
    "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter",
    "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook",
    "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly",
    "feather", "grass", "haze", "mountain", "night", "pond", "darkness",
    "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder",
    "violet", "water", "wildflower", "wave", "water", "resonance", "sun",
    "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog",
    "smoke", "star"
  ];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
}

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

class ChatPage extends Component {
  state = {
    serverData: "",
    userData: "",
    loading: false,
    messages: [],
    member: {
      username: randomName(),
      color: randomColor(),
    }
  }
  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.user("GAMEROOMCHAT").on('value', snapshot => {
      //console.log(snapshot.val());
      this.setState({
        serverData: snapshot.val(),
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.user("GAMEROOMCHAT").off();
  }

  constructor() {
    super();
    this.drone = new window.Scaledrone("09ce0IpIJ7oem4gE", {
      data: this.state.member
    });
    this.drone.on('open', error => {
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member});
    });
    const room = this.drone.subscribe("observable-room");
    room.on('data', (data, member) => {
      if (member) {
        const messages = this.state.messages;
        messages.push({member, text: data});
        this.setState({messages});
      }
    });
  }

  render() {
    if (!this.state.serverData) { //load server
      return (<div>Loading Server Data...</div>);
    }
    var user = firebase.auth().currentUser;
    console.log(user);
    if (user && !this.state.userData) {
      this.props.firebase.user(user.uid).on('value', snapshot => {
        this.setState({
          userData: snapshot.val(),
          loading: false,
        });
      });
    }
    if (!this.state.userData) { //load user
      return (<div>Loading User Data...</div>);
    }
    var database = firebase.database();
    if (this.state.serverData){
      var notExists = true;
      var i;
      for (i = 0; i < this.state.serverData.players.length; i++){
        if (this.state.serverData.players[i] === this.state.userData.name) {
          notExists = false;
        }
      }
      if (notExists && this.state.userData.name) {
        var newPlayers = this.state.serverData.players;
        console.log(newPlayers);
        console.log(this.state.userData.name);
        newPlayers.push(this.state.userData.name);
        firebase.database().ref('users/' + "GAMEROOMCHAT").set({ //add the player
          isGame: this.state.serverData.isGame,
          isOpen: this.state.serverData.isOpen,
          players: newPlayers,
          hasAdded: this.state.serverData.hasAdded,
          toKick: this.state.serverData.toKick
        });
      }
    }
    //GAME SHIT
    if (this.state.serverData.isGame === "false") {
      if (this.state.serverData.players.length >= 4) { //change to 6
        firebase.database().ref('users/' + "GAMEROOMCHAT").set({
          isGame: "true",
          isOpen: "false",
          players: this.state.serverData.players,
          hasAdded: this.state.serverData.hasAdded,
          toKick: this.state.serverData.toKick
        });
      } else {
        return(
          <div>
          <h1>Please wait for 5 players (Current Players: {this.state.serverData.players.length - 1})</h1>
          </div>
        );
      }
    } else {
      if (this.state.serverData.players.length === 2) {
        firebase.database().ref('users/' + user.uid).set({
          name: this.state.userData.name,
          email: this.state.userData.email,
          numWins: this.state.userData.numWins + 1
        });
        firebase.database().ref('users/' + "GAMEROOMCHAT").set({
          isGame: "true",
          isOpen: "false",
          players: ["FillerNotUser"],
          hasAdded: ["FillerNotUser"],
          toKick: ""
        });
        console.log("winner winner chicken dinner");
        return (<Redirect to={ROUTES.WIN} />);
      }
      if (this.state.serverData.toKick === this.state.userData.name) {
        var newPlayers = this.state.serverData.players;
        newPlayers.splice(this.state.serverData.players.indexOf(this.state.userData.name), 1);
        firebase.database().ref('users/' + "GAMEROOMCHAT").set({
          isGame: "true",
          isOpen: "false",
          players: newPlayers,
          hasAdded: this.state.serverData.hasAdded,
          toKick: this.state.serverData.toKick
        });
        console.log("some guy lost lmao");
        return (<Redirect to={ROUTES.LOSE} />);
      }
      return (
        <div className="App">
        <div className="App-header">
        <h1>My Chat App</h1>
        </div>
        <Messages
        messages={this.state.messages}
        currentMember={this.state.member}
        />
        <Input
        onSendMessage={this.onSendMessage}
        />
        {(() => {
          return this.state.serverData.players.map((d, i) => {
            return (
              <div>
              {(() => {
                if (!(d === "FillerNotUser")){
                  return (
                    <button>{d}</button>
                  )
                }
              })()}
              </div>
            )
          })
        })()}
        </div>
      );
    }
    return null;
  }
  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message
    });
  }
}

export default withFirebase(ChatPage);
