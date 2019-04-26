import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
//todo fix authentication
const INITIAL_STATE = {
  serverdata: "",
  isOpen: true,
};

const Navigation = () => (
  <div>
  <AuthUserContext.Consumer>
       {authUser =>
         authUser ? <NavigationAuth /> : <NavigationNonAuth />
       }
     </AuthUserContext.Consumer>
  </div>
);

class NavigationAuth extends Component {
  constructor() {
    super();
    this.state = { ...INITIAL_STATE };
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
    render(){
    //  console.log(authUser => authUser);
      //todo add auth
      if (true) {
       //if (!this.state){
       this.state.isOpen = this.state.serverdata.isOpen;
     //}
      if (this.state.isOpen === "true") {
        return (
          <ul>
            <li>
              <Link to={ROUTES.SIGN_IN}>Sign In</Link>
            </li>
            <li>
              <Link to={ROUTES.HOME}>Home</Link>
            </li>
            <li>
              <Link to={ROUTES.ACCOUNT}>Account</Link>
            </li>
            <li>
            <Link to={ROUTES.CHAT}>Battle Royal</Link>
            </li>
            <li>
              <SignOutButton />
            </li>
          </ul>
      )
    }
    else {
      return (
        <ul>
          <li>
            <Link to={ROUTES.HOME}>Home</Link>
          </li>
          <li>
            <Link to={ROUTES.ACCOUNT}>Account</Link>
          </li>
          <p>Battle Royale is not available (*sad fortnite dancing*)</p>
          <li>
            <SignOutButton />
          </li>
        </ul>
      )
    }
  }
  else {
    //for auth
  }
  }
}

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

export default withFirebase(NavigationAuth);
export {Navigation}
