import React from 'react';
import { AuthUserContext, withAuthorization } from '../Session';

const HomePage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Home</h1>
        <p> Hello {authUser.username}</p>
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
