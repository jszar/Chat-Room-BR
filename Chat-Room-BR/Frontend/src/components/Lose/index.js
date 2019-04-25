import React from 'react';
import * as ROUTES from '../../constants/routes';
import logo from './tumblr_m89kkgWqNr1rq1xcqo1_500.gif'

const LosePage = () => (
  <div>
    <h1>LMAO YOU LOST</h1>
    <img src={logo}/>
    <br/>
    <a href={ROUTES.HOME}>Go Home</a>
  </div>
);

export default LosePage;
