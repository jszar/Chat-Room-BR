import React from 'react';

import { withFirebase } from '../Firebase';
//TODO not a button
const SignOutButton = ({ firebase }) => (
  <a  onClick={firebase.doSignOut} class = "center">
    Sign Out
  </a>
);

export default withFirebase(SignOutButton);
