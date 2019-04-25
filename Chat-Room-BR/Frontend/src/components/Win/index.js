import React from 'react';
import './index.css';
import victoryroyale from './victoryroyale.png';
import thanos from './thanos.gif';
import * as ROUTES from '../../constants/routes';

const WinPage = () => (
  <div>
    <img src={victoryroyale} class = "center"/>
    <br/>
    <a href={ROUTES.HOME}  class = "center">Go Home</a>
    <img src={thanos} id="bg"/>
  </div>
);

export default WinPage;
