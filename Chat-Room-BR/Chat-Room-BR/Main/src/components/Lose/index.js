import React from 'react';
import './index.css';
import ninja from './ninja.gif'
import * as ROUTES from '../../constants/routes';

const LosePage = () => (
  <div>
    <h1>You lose!</h1>
    <br/>
    <a href={ROUTES.HOME} class = "center">Go Home</a>
    <img src={ninja} id="bg"/>
  </div>
);

export default LosePage;
