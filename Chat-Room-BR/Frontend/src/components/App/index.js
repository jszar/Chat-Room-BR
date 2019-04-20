import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from '../Navigation';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import ChatPage from '../Chat';
import AccountPage from '../Account';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }
  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }
  componentWillUnmount() {
    this.listener();
  }
  render() {
    return (
      <Router>
        <div>
          <Navigation authUser={this.state.authUser} />
          <hr/>
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
          <Route path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.CHAT} component={ChatPage} />
        </div>
      </Router>
    );
  }
}

// const App = () => (
//   <Router>
//   <div>
//     <Navigation />
//     <hr />
//     <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
//     <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
//     <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
//     <Route path={ROUTES.HOME} component={HomePage} />
//     <Route path={ROUTES.ACCOUNT} component={AccountPage} />
//     <Route path={ROUTES.CHAT} component={ChatPage} />
//   </div>
//   </Router>
// );

export default withFirebase(App);
