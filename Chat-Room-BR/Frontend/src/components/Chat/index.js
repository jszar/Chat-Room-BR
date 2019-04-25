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

  onClick(e, w){
    console.log("in on click");
    console.log(e);
    if (this.state.userData.numVotes > 0) {
      var newVotes = this.state.serverData.votes;
      newVotes.push(e);
      firebase.database().ref('users/' + "GAMEROOMCHAT").set({ //add the player
        totalVotes: this.state.serverData.totalVotes + 1,
        isGame: this.state.serverData.isGame,
        isOpen: this.state.serverData.isOpen,
        players: this.state.serverData.players,
        hasAdded: this.state.serverData.hasAdded,
        toKick: this.state.serverData.toKick,
        votes: newVotes
      });
      firebase.database().ref('users/' + w).set({
        name: this.state.userData.name,
        email: this.state.userData.email,
        numWins: this.state.userData.numWins,
        numVotes: 0
      });
    }
  }

  render() {
    if (!this.state.serverData) { //load server
      return (<div>Loading Server Data...</div>);
    }
    var user = firebase.auth().currentUser;
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
          totalVotes: this.state.serverData.totalVotes,
          isGame: this.state.serverData.isGame,
          isOpen: this.state.serverData.isOpen,
          players: newPlayers,
          hasAdded: this.state.serverData.hasAdded,
          toKick: this.state.serverData.toKick,
          votes: this.state.serverData.votes
        });
      }
    }
    //GAME SHIT
    if (this.state.serverData.isGame === "false") {
      if (this.state.serverData.players.length >= 4) { //change to 6
        firebase.database().ref('users/' + "GAMEROOMCHAT").set({
          totalVotes: this.state.serverData.totalVotes,
          isGame: "true",
          isOpen: "false",
          players: this.state.serverData.players,
          hasAdded: this.state.serverData.hasAdded,
          toKick: this.state.serverData.toKick,
          votes: this.state.serverData.votes
        });
      } else {
        return(
          <div>
          <h1>Please wait for 5 players (Current Players: {this.state.serverData.players.length - 1})</h1>
          </div>
        );
      }
    } else {
      //IN THE GAAAAAAAMMMMMEEEEEEEEEEE
      if (this.state.serverData.totalVotes === this.state.serverData.players.length - 1) {
        var arr = this.state.serverData.votes;
        var mf = 1;
        var m = 0;
        var player;
        for (var i=0; i<arr.length; i++)
        {
          for (var j=i; j<arr.length; j++)
          {
            if (arr[i] == arr[j])
            m++;
            if (mf<m)
            {
              mf=m;
              player = arr[i];
            }
          }
          m=0;
        }
        var newPlayers = this.state.serverData.players;
        newPlayers.splice(this.state.serverData.players.indexOf(player), 1);
        firebase.database().ref('users/' + "GAMEROOMCHAT").set({
          totalVotes: 0,
          isGame: "true",
          isOpen: "false",
          players: newPlayers,
          hasAdded: this.state.serverData.hasAdded,
          toKick: player,
          votes: ["FillerNotUser"]
        });
        firebase.database().ref('users/' + user.uid).set({
          name: this.state.userData.name,
          email: this.state.userData.email,
          numWins: this.state.userData.numWins,
          numVotes: 1
        });
      }
      if (this.state.serverData.toKick === this.state.userData.name) {
        var newPlayers = this.state.serverData.players;
        newPlayers.splice(this.state.serverData.players.indexOf(this.state.userData.name), 1);
        firebase.database().ref('users/' + user.uid).set({
          name: this.state.userData.name,
          email: this.state.userData.email,
          numWins: this.state.userData.numWins,
          numVotes: 1
        });
        firebase.database().ref('users/' + "GAMEROOMCHAT").set({
          totalVotes: 0,
          isGame: "true",
          isOpen: "false",
          players: newPlayers,
          hasAdded: this.state.serverData.hasAdded,
          toKick: this.state.serverData.toKick,
          votes: this.state.serverData.votes
        });
        console.log("some guy lost lmao");
        return (<Redirect to={ROUTES.LOSE} />);
      } else if (this.state.serverData.players.length === 2) {
        firebase.database().ref('users/' + user.uid).set({
          name: this.state.userData.name,
          email: this.state.userData.email,
          numWins: this.state.userData.numWins + 1,
          numVotes: 1
        });
        firebase.database().ref('users/' + "GAMEROOMCHAT").set({
          totalVotes: 0,
          isGame: "false",
          isOpen: "true",
          players: ["FillerNotUser"],
          hasAdded: ["FillerNotUser"],
          toKick: "",
          votes: ["FillerNotUser"]
        });
        console.log("winner winner chicken dinner");
        return (<Redirect to={ROUTES.WIN} />);
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
                    <button name={d} onClick={() => this.onClick(d, user.uid)}  >{"Vote " + d}</button>
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
