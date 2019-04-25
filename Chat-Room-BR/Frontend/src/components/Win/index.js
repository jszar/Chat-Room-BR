import React from 'react';
import logo from './AliveNippyJunebug-max-1mb.gif'
import * as ROUTES from '../../constants/routes';

const WinPage = () => (
  <div>
    <h1>WINNER WINNER CHICKEN VICTORY ROYALE</h1>
    <img src={logo}/>
    <br/>
    <a href={ROUTES.HOME}>Go Home</a>
  </div>
);

export default WinPage;
