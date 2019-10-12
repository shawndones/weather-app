import React, { Component } from 'react';
import './App.css';
import Moment from 'react-moment';
// import WeatherList from './components/WeatherList';

/*
* Next Steps
* - Create Input Field for location by zipcode
* 
*/

const APIKEY = "84ef52b9160716fd0953ce92456fb897"

export default class App extends Component {
  state = {
    zip: "40107",
    currentTemp: "",
    weather: [],
    forecast: []
  }
  // Making 2 api calls at once https://medium.com/@wisecobbler/using-the-javascript-fetch-api-f92c756340f0

  componentDidMount() {
    var currentWeather = fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${this.state.zip},us&appid=${APIKEY}`)
    .then(response => response.json());
    var forecastWeather = fetch(`http://api.openweathermap.org/data/2.5/forecast?zip=${this.state.zip},us&appid=${APIKEY}`)
    .then(response => response.json());
    var combinedData = {"currentWeather":{},"forecastWeather":{}};
    Promise.all([currentWeather, forecastWeather])
      .then(data => {
        combinedData["currentWeather"] = data[0];
        combinedData["forecastWeather"] = data[1];
        return combinedData;
      }).then(combinedData => {
        // console.log(combinedData["currentWeather"]);
        const { weather, main } = combinedData["currentWeather"];
        const { temp } = main;
        const { list } = combinedData["forecastWeather"];
        // console.log(list);
        this.setState({
          currentTemp: temp,
          weather: weather[0],
          forecast: list
        })
      });
  }


  tempConvert = (temp) => {
    temp = (temp-273.15)* 9/5 + 32
    return Math.floor(temp)
  }

  render() {
    const temp = this.tempConvert(this.state.currentTemp)
    const currentConditions = this.state.weather
    // console.log(this.state.weather.id);
    // console.log(this.state.forecast);
    // const fiveDayForecast = this.state.forecast.slice( 0, 5)
    return (
      <div className="weatherApp">
        <h1>Weather in Boston, KY</h1>
        <h2>Current Conditions: {currentConditions.main}</h2>
        <img src={`http://openweathermap.org/img/w/${currentConditions.icon}.png`} alt="" />
        <p>{temp}&#176;</p>
        <h2>Forecast</h2>
        <div className="grid">
        {this.state.forecast.map((weatherItem,key) => (
          <div
            className="day" 
            key={key}>
              <p>
              <Moment format="dddd, ha">{weatherItem.dt_txt}</Moment>
              </p>
              <p className="temp">
                {this.tempConvert(weatherItem.main.temp)}&#176;
              </p>
              <img src={`http://openweathermap.org/img/w/${weatherItem.weather[0].icon}.png`} alt="" />
              <p>{`${weatherItem.weather[0].description}`}</p>
          </div>
        ))}
        </div>
      </div>
    );
  }
}
