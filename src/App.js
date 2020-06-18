import React, { Component } from 'react';
import './App.css';
import Moment from 'react-moment';
import moment from 'moment';
// import WeatherList from './components/WeatherList';

/*
* Next Steps
* - Create Input Field for location by zipcode
* 
*/

const APIKEY = process.env.REACT_APP_WEATHER_API_KEY;

export default class App extends Component {
  state = {
    zip: "40107",
    currentTemp: "",
    weather: [],
    forecast: []
  }
  // Making 2 api calls at once https://medium.com/@wisecobbler/using-the-javascript-fetch-api-f92c756340f0

  componentDidMount() {
    var currentWeather = fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${this.state.zip},us&appid=${APIKEY}`)
    .then(response => response.json());
    var forecastWeather = fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=${this.state.zip},us&appid=${APIKEY}`)
    .then(response => response.json());
    var combinedData = {"currentWeather":{},"forecastWeather":{}};
    Promise.all([currentWeather, forecastWeather])
      .then(data => {
        combinedData["currentWeather"] = data[0];
        combinedData["forecastWeather"] = data[1];
        return combinedData;
      }).then(combinedData => {
        // console.log(combinedData["currentWeather"]);
        // console.log(combinedData["forecastWeather"]);
        const { weather, main } = combinedData["currentWeather"];
        const { temp } = main;
        const { list } = combinedData["forecastWeather"];

        this.setState({
          currentTemp: temp,
          weather: weather[0],
          forecast: list
        })
      });
  }

  getHighsLows = (list) => {

        // let listKeys = Object.keys(list);
        let listValues = Object.values(list);

        // console.log(listValues);
        let prevDay;
        let dayTemps = [];
        let i = 0;

        for(const value of listValues) {
          // console.log(previousDate + value.dt_txt);
          let nowDay = new Date(value.dt_txt);
          // console.log(nowDay);
          nowDay = moment(nowDay).format('dddd');



          // let nowMonth = nowDay.getDate();
          console.log(nowDay)
          // console.log(value.dt_txt);
          // console.log(prevDay);
          if((nowDay === prevDay) || (i === 0) ) {

           
            dayTemps.push(value.main.temp);
            // console.log(value.main.temp);
            console.log(dayTemps);
            
          } else {
              // Stop interation and find low and high temp for this day
              // console.log(nowDay);
              // console.log(Math.max(...dayTemps));
              // console.log(Math.floor(...dayTemps));

              // Reset for new day
              dayTemps = [];
              i = 0;
          }
         
          // const dates = [];
        //  dates.push = value.dt_txt;
        prevDay = new Date(value.dt_txt);
        prevDay = nowDay;
         i++;
        }

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
    this.getHighsLows(this.state.forecast);
    return (
      <div className="weatherApp">
        <header className="c-header">
          <h1>Weather</h1>
        </header>
        <h2>Current Conditions: {currentConditions.main}</h2>
        <img src={`http://openweathermap.org/img/w/${currentConditions.icon}.png`} alt="" />
        <p>{temp}&#176;</p>

        <h2>Highs &amp; Lows</h2>
      
        
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
