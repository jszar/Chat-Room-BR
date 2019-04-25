import React, { Component } from 'react';
import './index.css';
import victoryroyale from './victoryroyale.png';
import thanos from './thanos.gif';
import * as ROUTES from '../../constants/routes';
import config from '../Firebase';
import * as firebase from 'firebase';
import { Redirect } from 'react-router-dom';

const WinPage = () => (
  <div class="center">
    <img src={victoryroyale} id="vr"/>
    <br/>
    <a href={ROUTES.HOME}>Go Home</a>
    <img src={thanos} id="bg"/>
    <Reset/>
  </div>
);
const INITIAL_STATE = {
  serverData: '',
  error: null,
};
class Reset extends Component{
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  render(){
    firebase.database().ref('users/' + "GAMEROOMCHAT").set({
      totalVotes: 0,
      isGame: "false",
      isOpen: "true",
      players: ["FillerNotUser"],
      hasAdded: ["FillerNotUser"],
      toKick: "",
      votes: ["FillerNotUser"]
    });
    return(
      <div>
      </div>
    )
  }
}


export default WinPage;
