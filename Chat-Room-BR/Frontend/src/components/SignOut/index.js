import React from 'react';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <a type="button" onClick={firebase.doSignOut} href="http://localhost:3000/">
    Sign Out
  </a>
);

export default withFirebase(SignOutButton);
