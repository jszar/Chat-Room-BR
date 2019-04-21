import React, { Component } from 'react';
import './Roblox.css';
import Messages from "./Messages";
import Input from "./Input";
import { withFirebase } from '../Firebase';
import config from '../Firebase';
import * as firebase from 'firebase';


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

const INITIAL_STATE = {
  messages: [],
  member: {
    username: randomName(),
    color: randomColor(),
  },
  serverdata: "",
  isGame: false,
  loading: false,
};
var players = [];
var index = 0;
class ChatPage extends Component {
  constructor() {
    super();
    this.state = { ...INITIAL_STATE };
    players[index] = this.state.member;
    index++;
    console.log(players);
    this.drone = new window.Scaledrone("09ce0IpIJ7oem4gE", {
      data: this.state.member
    });
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member});
    });
    const room = this.drone.subscribe("observable-room");
    room.on('data', (data, member) => {
      const messages = this.state.messages;
      messages.push({member, text: data});
      this.setState({messages});
    });
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.user("GAMEROOMCHAT").on('value', snapshot => {
      console.log(snapshot.val());
      this.setState({
        serverdata: snapshot.val(),
        loading: false,
      });
    });
  }
  componentWillUnmount() {
    this.props.firebase.user("GAMEROOMCHAT").off();
  }



  render() {
  //  if (!this.state) {
    //}
    var players = this.state;
   players = this.state.serverdata.players;
    console.log(players);
    if (players){
      var notExists = true;
      var i;
      for (i = 0; i < players.length; i++){
        if (players[i] === this.state.member.username) {
          notExists = false;
        }
      }

      if (notExists) {
        players[players.length] = this.state.member.username;
      }
      console.log("player " + players[0]);


  //  this.state.players[this.state.players.length] = this.state.member;
    var cars = ["FillerNotUser"];
     var database = firebase.database();
     firebase.database().ref('users/' + "GAMEROOMCHAT").set({
     isGame: "true",
     isOpen: "true",
     players: players
    });
  }
      if (true) {
        //if number of players >= 5 set isGame to true
      }
      this.state.isGame = this.state.serverdata.isGame;
      if (this.state.isGame === "true"){
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
        </div>
      );
    }
    else {
      return(
        <div>
          <h1>Please for the game to start</h1>
        </div>
      )
    }
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message
    });
  }

}

export default withFirebase(ChatPage);
