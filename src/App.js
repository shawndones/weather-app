import React, { Component } from 'react';
import './App.css';

/*
* Next Steps
* - Create Input Field for location by zipcode
* 
*/

const APIKEY = "84ef52b9160716fd0953ce92456fb897"

export default class App extends Component {
  state = {
    zip: "40107",
    forecast: {
      main: {}
    },
    weather: []
  }

  componentDidMount() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${this.state.zip},us&appid=${APIKEY}`)
      .then(response => response.json())
      .then(data => {

        const {weather} = data
        console.log(weather[0])

        this.setState({
          forecast: data,
          weather: weather[0]
        })
      })
  }


  tempConvert = (temp) => {
    temp = (temp-273.15)* 9/5 + 32
    return Math.floor(temp)
  }

  render() {
    const temp = this.tempConvert(this.state.forecast.main.temp)
    const conditions = this.state.weather
    return (
      <div className="weatherApp">
        <h1>Current Weather in Boston, KY</h1>
        <h2>{conditions.main}</h2>
        <img src={`http://openweathermap.org/img/w/${conditions.icon}.png`} alt="" />
        <p>{temp}&#176;</p>
      </div>
    );
  }
}
