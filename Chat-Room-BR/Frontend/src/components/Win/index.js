import React from 'react';
import logo from './AliveNippyJunebug-max-1mb.gif'

import { withAuthorization } from '../Session';



const WinPage = () => (
  <div>
    <h1>WINNER WINNER CHICKEN VICTORY ROYALE</h1>
    <img src={logo}/>
  </div>
);

export default WinPage;
