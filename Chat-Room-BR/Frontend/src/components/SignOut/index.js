import React from 'react';

import { withFirebase } from '../Firebase';
//TODO not a button
const SignOutButton = ({ firebase }) => (
  <button type="button" onClick={firebase.doSignOut}>
    Sign Out
  </button>
);

export default withFirebase(SignOutButton);
