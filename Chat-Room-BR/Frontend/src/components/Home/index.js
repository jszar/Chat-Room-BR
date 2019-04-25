import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';
import { withAuthorization } from '../Session';
import SignOutButton from '../SignOut';
import { withFirebase } from '../Firebase';
import config from '../Firebase';
import * as firebase from 'firebase';

import rank1 from './rank1.png';
import rank2 from './rank2.png';
import rank3 from './rank3.png';
import rank4 from './rank4.png';
import rank5 from './rank5.png';
import gustavo from './gustavo.jpg';
import './index.css';

const INITIAL_STATE = {
  numWins: '',
  roundsSurvived: '',
  userData: '',
  error: null,
};

const HomePage = () => (
  <div>
    <StatsForm/>
  </div>
);

class Stats extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  render (){
    var user = firebase.auth().currentUser;
    if (user && !this.state.userData) {
      this.props.firebase.user(user.uid).on('value', snapshot => {
        this.setState({
          userData: snapshot.val(),
          loading: false,
        });
      });
    }
    return (
      <div>
      <iframe frameborder="0" height="100%" width="100%"
      src="https://youtube.com/embed/f54tf7gE3y0?start=14&autoplay=1&controls=0&showinfo=0&autohide=1&mute=1" id='bg'>
      </iframe>
      <br/>
      <h1>Ready to get some VICTORY ROYALES {this.state.userData.name}???</h1>
      <h3>Number of wins: {this.state.userData.numWins}</h3>
      {(() => {
        var wins = this.state.userData.numWins;
          if (wins === 0) {
            return(<div> <img src={rank1} class = "center"/> <h3>Rank: Baby</h3> </div>);
          }
          else if (wins > 0 && wins <= 9) {
            return(<div> <img src={rank2} class = "center"/> <h3>Rank: Chatter</h3> </div>);
          }
          else if (wins > 9 && wins <= 99) {
            return(<div> <img src={rank3} class = "center"/> <h3>Rank: Speaker</h3> </div>);
          }
          else if (wins > 99 && wins <= 999) {
            return(<div> <img src={rank4} class = "center"/> <h3>Rank: Yeller</h3> </div>);
          }
          else if (wins > 999 && wins <= 99999){
            return(<div> <img src={rank5} class = "center"/> <h3>Rank: Chat Boss</h3> </div>);
          }
          else {
            return(<div> <img src={gustavo} class = "center"/> <h3>Rank: Chat God</h3> </div>);
          }
      })()}
      <br/>
      <a href={ROUTES.CHAT} class = "center">Play Battle Royale</a>
      <br/>
      <a href={ROUTES.ACCOUNT} class = "center">Change my settings</a>
      <br/>
      <SignOutButton class = "center"/>
      </div>
    )
  }
}



const condition = authUser => !!authUser;

const StatsForm = withFirebase(Stats);

export {StatsForm};

export default withAuthorization(condition)(HomePage);
