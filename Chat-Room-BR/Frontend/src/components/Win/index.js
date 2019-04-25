import React from 'react';
import './index.css';
import thanos from './thanos.gif';
import * as ROUTES from '../../constants/routes';

const WinPage = () => (
  <div class="center">
    <h1>You win!</h1>
    <br/>
    <a href={ROUTES.HOME}>Go Home</a>
    <img src={thanos} id="bg"/>
  </div>
);

export default WinPage;
