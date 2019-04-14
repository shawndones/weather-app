import React, { Component } from 'react';
import './App.css';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      forecast: {
        main: {},
        weather: []
      }
    }
    this.tempConvert = this.tempConvert.bind(this)
    this.getCurrentConditions = this.getCurrentConditions.bind(this)
  }

  componentDidMount() {
    fetch("")
      .then(response => response.json())
      .then(data => {
        this.setState({
          forecast: data
        })
      })
  }

  getCurrentConditions() {
      const conditions = this.state.forecast.weather.map(item => {
        return item.main
      })

      return conditions

  }

  tempConvert(temp) {
    temp = (temp-273.15)* 9/5 + 32
    return Math.floor(temp)
  }

  render() {
    const temp = this.tempConvert(this.state.forecast.main.temp)
    const conditions = this.getCurrentConditions()

    return (
      <div className="weatherApp">
        <h1>Current temperature in Boston, KY is {temp} degrees</h1>
        <h2>Current Conditions: {conditions}</h2>
      </div>
    );
  }
}
