import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';

import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
  name: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  numWins: 0,
  numVotes: 1,
  error: null,
};

const SignUpPage = () => (
  <div>
    <h1>Sign Up</h1>
    <SignUpForm />
  </div>
);

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { name, email, passwordOne, numWins, numVotes } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            name,
            email,
            numWins,
            numVotes,
          });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  onChange = event => {
   this.setState({ [event.target.name]: event.target.value });
 };

 render() {
     const {
       name,
       email,
       passwordOne,
       passwordTwo,
       error,
     } = this.state;

     const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      name === '';

     return (
       <form onSubmit={this.onSubmit}>
         <input
           name="name"
           value={name}
           onChange={this.onChange}
           type="text"
           placeholder="Username"
         />
         <br/>
         <input
           name="email"
           value={email}
           onChange={this.onChange}
           type="text"
           placeholder="Email Address"
         />
         <br/>
         <input
           name="passwordOne"
           value={passwordOne}
           onChange={this.onChange}
           type="password"
           placeholder="Password"
         />
         <br/>
         <input
           name="passwordTwo"
           value={passwordTwo}
           onChange={this.onChange}
           type="password"
           placeholder="Confirm Password"
         />
         <br/>
         <button disabled={isInvalid} type="submit" class = "center">Sign Up</button>
         {error && <p>{error.message}</p>}
       </form>
     );
   }
}

const SignUpLink = () => (
  <p>
  <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);
const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);
export default SignUpPage;

export { SignUpForm, SignUpLink };
