import React, { Component } from 'react';
import './Roblox.css';
import Messages from "./Messages";
import Input from "./Input";

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

class App extends Component {
  state = {
    messages: [],
    member: {
      username: randomName(),
      color: randomColor(),
    },
    userData: "",
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
<<<<<<< HEAD
=======
    if (!(this.state.serverdata)) {
      return(
        <div>
        <h1>Loading...</h1>
        </div>
      );
    }
    var user = firebase.auth().currentUser;
    if (user && !this.state.userdata) {
      this.props.firebase.user(user.uid).on('value', snapshot => {
        //  console.log(snapshot.val());
        this.setState({
          userdata: snapshot.val(),
          loading: false,
        });
      });
      //this.state.member.username = user.name;
    }
    else if (this.state.userdata) {
      this.state.member.username = this.state.userdata.name
    }
    else {
      return (
        <div>
        <h1>Loading...</h1>
        </div>
      )
    }
    var players = this.state;
    players = this.state.serverdata.players;
    this.state.hasAdded = this.state.serverdata.hasAdded;
    //sole.log(players);
    if (this.state.hasAdded && this.state.member) {
      var notExists = true;
      for (var i = 0; i < this.state.hasAdded.length; i++) {
        if (this.state.hasAdded[i] === this.state.member.username || this.state.member.username === "mario"){
          notExists = false;
        }
      }
      if (notExists){
        this.state.hasAdded[this.state.hasAdded.length] = this.state.member.username
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
        const room = this.drone.subscribe("gameroom420");
        room.on('data', (data, member) => {
          const messages = this.state.messages;
          messages.push({member, text: data});
          this.setState({messages});
        });
      }
    }
>>>>>>> parent of daf08e1... Small fix
    var database = firebase.database();
    if (players){
      var notExists = true;
      var i;
      for (i = 0; i < players.length; i++){
        if (players[i] === this.state.member.username) {
          notExists = false;
        }
      }
      if (this.state.member.username === "mario") {
        notExists = false;
      }
      if (notExists && this.state.member.username !== null) {
        players[players.length] = this.state.member.username;
        firebase.database().ref('users/' + "GAMEROOMCHAT").set({ //add the player
          isGame: this.state.serverdata.isGame,
          isOpen: this.state.serverdata.isOpen,
          players: players,
          hasAdded: this.state.serverdata.hasAdded,
          toKick: this.state.serverdata.toKick
        });
      }
    }
    if (this.state.serverdata.isGame === "false") {
      if (players.length >= 4) { //change to 6
        firebase.database().ref('users/' + "GAMEROOMCHAT").set({
          isGame: "true",
          isOpen: "false",
          players: players,
          hasAdded: this.state.serverdata.hasAdded,
          toKick: this.state.serverdata.toKick
        });
      } else {
        return(
          <div>
          <h1>Please wait for 5 players (Current Players: {players.length - 1})</h1>
          </div>
        );
      }
    } else {
      if (this.state.setverdata.players.length === 3 || this.state.setverdata.players.length === 2) {
        firebase.database().ref('users/' + user.uid).set({
          name: this.state.userdata.name,
          email: this.state.userdata.email,
          numWins: this.state.userdata.numWins + 1
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
      if (this.state.serverdata.toKick === this.state.userdata.name) {
        players.splice(players.indexOf(user.name), 1);
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
          return this.state.serverdata.players.map((d, i) => {
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

export default App;
