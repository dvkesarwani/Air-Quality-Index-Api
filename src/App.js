import React, { Component } from 'react';
import './App.css';
import AirQuality from './airQuality/AirQuality';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AirQuality />
      </div>
    );
  }
}

export default App;
