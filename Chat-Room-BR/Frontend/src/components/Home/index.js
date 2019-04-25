import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';
import { withAuthorization } from '../Session';
import SignOutButton from '../SignOut';
import { withFirebase } from '../Firebase';
import config from '../Firebase';
import * as firebase from 'firebase';
/*
import rank1 from './rank1.png';
import rank2 from './rank2.png';
import rank3 from './rank3.png';
import rank4 from './rank4.png';
import rank5 from './rank5.png';
import gustavo from './gustavo.png';
import './index.css';
*/

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
      <h1>Ready to get some VICTORY ROYALES {this.state.userData.name}???</h1>
      {(() => {
        var wins = this.state.userData.numWins;
          if (wins === 0) {
            //return(<img src={rank1} class = "center"/>);
          }
          else if (wins > 0 && wins <= 9) {
            //return(<img src={rank2} class = "center"/>);
          }
          else if (wins > 9 && wins <= 99) {
            //return(<img src={rank3} class = "center"/>);
          }
          else if (wins > 99 && wins <= 999) {
            //return(<img src={rank4} class = "center"/>);
          }
          else if (wins > 999 && wins <= 99999){
            //return(<img src={rank5} class = "center"/>);
          }
          else {
            //return(<img src={gustavo} class = "center"/>);
          }
      })()}
      <h1>Number of wins: {this.state.userData.numWins}</h1>
      <a href={ROUTES.CHAT}>Play Battle Royale</a>
      <br/>
      <a href={ROUTES.ACCOUNT}>Change my settings</a>
      <br/>
      <SignOutButton />

      </div>
    )
  }
}



const condition = authUser => !!authUser;

const StatsForm = withFirebase(Stats);

export {StatsForm};

export default withAuthorization(condition)(HomePage);
