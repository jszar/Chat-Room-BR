import React from 'react';
import PasswordChangeForm from '../PasswordChange';
import { AuthUserContext, withAuthorization } from '../Session';
import background from '../mainbackground.jpg';

const AccountPage = () => (
  <div>
  <AuthUserContext.Consumer>
      {authUser => (
        <div>
          <h1>Account: {authUser.name}</h1>
          <PasswordChangeForm />
        </div>
      )}
  </AuthUserContext.Consumer>
  <img src={background} id="bg"/>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
