import React, { Component } from "react";
import UserLocation from "../../components/UserLocation/UserLocation";
import Axios from "axios";
import Search from "../SearchLocation/Search";
import "./weather.scss";

class Weather extends Component {
  
  //state
  state = {
    userPosition: {
      latitude: 35,
      longitude: 139,
    },
    weather: {},
    regionInput: "",
  };

  componentDidMount() {
    //check whether geolocation is supported
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        //get the lat and long of your device
        let pos = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
  
        this.setState({ userPosition: pos }, () => {
          //Weather Api call
          Axios.get(
            `http://api.weatherstack.com/current?access_key=0713c10ef07626f7b515bc263d75784a&query=${this.state.userPosition.latitude},${this.state.userPosition.longitude}`
          ).then((res) => {
            console.log(res.data);
              let userWeather = {
                temperature: res.data.current.temperature,
                description: res.data.current.weather_descriptions[0],
                location: res.data.location.name,
                region: res.data.location.region,
                country: res.data.location.country,
                wind_speed: res.data.current.wind_speed,
                pressure: res.data.current.pressure,
                precip: res.data.current.precip,
                humidity: res.data.current.humidity,
                img: res.data.current.weather_icons,
              };
              this.setState({ weather: userWeather });
          });
        });
      });
    }
  }
  

  //update the value of the the input field with state
  changeRegion = (value) => {
    this.setState({ regionInput: value });
  };

  //update the weather depending upon the value user entered
  changeLocation = (e) => {
    e.preventDefault();
    console.log("regionInput=", this.state.regionInput);
    Axios.get(
      `http://api.weatherstack.com/current?access_key=0713c10ef07626f7b515bc263d75784a&query=${this.state.regionInput}`
    ).then((res) => {
      let userWeather = {
        temperature: res.data.current.temperature,
        description: res.data.current.weather_descriptions[0],
        location: res.data.location.name,
        region: res.data.location.region,
        country: res.data.location.country,
        wind_speed: res.data.current.wind_speed,
        pressure: res.data.current.pressure,
        precip: res.data.current.precip,
        humidity: res.data.current.humidity,
        img: res.data.current.weather_icons,
      };

      this.setState({ weather: userWeather });
    });
  };

  render() {
    return (
      <div className="mainconatiner">
        <div className="search">
          <div className="col-md-6">
            <h1 className="title">Weather</h1>
            <div className="placesearch">
              <Search
                changeRegion={this.changeRegion}
                changeLocation={this.changeLocation}
              />
            </div>
          </div>
        </div>
        <div className="container">
          <UserLocation weather={this.state.weather} />
        </div>
      </div>
    );
  }
}

export default Weather;
