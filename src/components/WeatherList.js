import React, { Component } from 'react';
// import { Link } from 'react-router-dom'

const WeatherList = ({ forecast }) => (
  <>
   {forecast.map((weatherItem,key) => (
      <p key={key}>{weatherItem.main.temp}</p>
    ))}
  </>
)

export default WeatherList
