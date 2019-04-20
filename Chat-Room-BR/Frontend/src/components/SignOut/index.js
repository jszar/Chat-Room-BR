import React from 'react';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <button type="button" onClick={firebase.doSignOut} href="http://localhost:3000/">
    Sign Out
  </button>
);

export default withFirebase(SignOutButton);
