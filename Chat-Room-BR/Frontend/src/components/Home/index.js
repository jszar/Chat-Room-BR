import React from 'react';
import * as ROUTES from '../../constants/routes';
import { withAuthorization } from '../Session';
import SignOutButton from '../SignOut';


const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <a href={ROUTES.CHAT}>Play Battle Royale</a>
    <br/>
    <a href={ROUTES.ACCOUNT}>Change my settings</a>
    <br/>
    <SignOutButton />
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
