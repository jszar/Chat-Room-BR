import React, { Component } from 'react';
import Layout from './components/Layout'
import './index.css';

class App extends Component {
  render() {
    return (
      <div className="Container">
        <Layout title="fuckin chat room"/>
      </div>
    );
  }
}

export default App;
