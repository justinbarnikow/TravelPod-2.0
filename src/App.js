import React, { Component } from 'react'
import { Routes, Route } from 'react-router-dom'
import './style/App.css'
import AppContext from './AppContext'
import EndPage from './comps/EndPage'
import PodcastPage from './comps/PodcastPage'
import StartPage from './comps/StartPage'
import WelcomePage from './comps/WelcomePage'

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      getVehicle: this.getVehicle,
      getStartingLocation: this.getStartingLocation,
      getEndingLocation: this.getEndingLocation,
      getDistance: this.getDistance,
      getPodcasts: this.getPodcasts,
      travel: {
        miles: '', time: '', vehicle: ''
      },
      startingLocation: {
        userInput: '', place_name: '', geo: []
      },
      endingLocation: {
        userInput: '', place_name: '', geo: []
      },
      podcast: {
        userInput: '', list: []
      }
    }
  }

  getVehicle = (e) => {
    e.preventDefault()
    this.setState({ travel: { vehicle: e.target.vehicle.value}})
  }

  getStartingLocation = (e) => {
    e.preventDefault()
    function formatQueryParams(params) {
      const queryItems = Object.keys(params).map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      );
      return queryItems.join("&");
    }
    const locStart = e.target.locStart.value
    const baseStartLocationUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${locStart}.json`;
    const apiKeyMap = "pk.eyJ1IjoianVzdGluYmFybmlrb3ciLCJhIjoiY2trbW00aTQyMW1kNzJvcDd1N3lmdXc5YyJ9.oLLeeMwPnjYSXk-z_XC-1w";
    const params = {
      access_token: apiKeyMap,
      limit: 3,
    };
    const queryString = formatQueryParams(params);
    const startLocationUrl = baseStartLocationUrl + "?" + queryString;
    fetch(startLocationUrl) 
      .then(async (data) => {
        if(data.ok) {
          data = await data.json()
          const newGeo = []
          newGeo.push(
            data.features[0].geometry.coordinates[1],
            data.features[0].geometry.coordinates[0]
          )
          this.setState({startingLocation: {
            userInput: locStart, place_name: data.features[0].place_name, geo: newGeo
          }})
        } else {
          throw new Error(data.status + "Failed")
        }
      }).catch(e => alert('Search failed.' + e))
      Array.from(document.querySelectorAll('input')).forEach(
        input => (input.value = "")
      );  
  }

  getEndingLocation = (e) => {
    e.preventDefault();
    function formatQueryParams(params) {
      const queryItems = Object.keys(params).map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      );
      return queryItems.join("&");
    }
    const locEnd = e.target.locEnd.value;
    const baseEndLocUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${locEnd}.json`;
    const apiKeyMap = "pk.eyJ1IjoianVzdGluYmFybmlrb3ciLCJhIjoiY2trbW00aTQyMW1kNzJvcDd1N3lmdXc5YyJ9.oLLeeMwPnjYSXk-z_XC-1w";
    const params = {
      access_token: apiKeyMap,
      limit: 3,
    };
    const queryString = formatQueryParams(params);
    const endLocationUrl = baseEndLocUrl + "?" + queryString;
    fetch(endLocationUrl)
      .then(async (data) => {
        if(data.ok) {
          data = await data.json()
          const newGeo = []
          newGeo.push(
            data.features[0].geometry.coordinates[1],
            data.features[0].geometry.coordinates[0]
          )
          this.setState({endingLocation: {
            userInput: locEnd, place_name: data.features[0].place_name, geo: newGeo
          }})
        } else {
          throw new Error(data.status + "Failed")
        }
      }).catch(e => alert('Search failed.' + e))
      Array.from(document.querySelectorAll('input')).forEach(
        input => (input.value = "")
      );  
  }

  getDistance = () => {
    function formatQueryParams(params) {
      const queryItems = Object.keys(params).map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      );
      return queryItems.join("&");
    }
    const start = this.state.startingLocation.geo
    const end = this.state.endingLocation.geo
    const travelType = this.state.travel.vehicle
    const distanceUnit = 'mile'
    const baseDistanceUrl = `https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix`
    const apiKeyBing = "Air7P5oll2Ivmi1sx1fJpU65mKmYiZOPKVwBzsLrvgPfXnnsLsyKHMpe6bVQ2UhW";
    const params = {
      origins: start,
      destinations: end,
      travelMode: travelType,
      key: apiKeyBing,
      distanceUnit: distanceUnit
    }
    const queryString = formatQueryParams(params);
    const distanceUrl = baseDistanceUrl + "?" + queryString
    fetch(distanceUrl) 
      .then(async (data) => {
        if(data.ok) {
          data = await data.json()
          const distance = data.resourceSets[0].resources[0].results[0].travelDistance.toFixed(2)
          const duration = Math.round(data.resourceSets[0].resources[0].results[0].travelDuration)
          this.setState({ travel: {
            miles: distance, time: duration, vehicle: travelType
          }})
        } else {
          throw new Error(data.status + "Failed")
        }
      }).catch(e => alert('Search failed.' + e))
  }

  getPodcasts = (e) => {
    e.preventDefault();
    const podcastInput = e.target.podcast.value
    function formatQueryParams(params) {
      const queryItems = Object.keys(params).map(
      key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
        );
      return queryItems.join("&");
    }
    const baseUrl = "https://listen-api.listennotes.com/api/v2/search";
    const API_KEY = '128acc2bf3774b9e8117982bb6657dd1';
    const query = podcastInput;
    const minLength = this.state.travel.time - 2 ;
    const maxLength = this.state.travel.time + 2;
    const params = {
      q: query,
      type: 'episode',
      len_min: minLength,
      len_max: maxLength,
      language: 'English',
      safe_mode: 0,
      region: 'us'
      }
    const queryString = formatQueryParams(params);
    const fullUrl = baseUrl + '?' + queryString;
    const options = {
      headers: new Headers ({
      "X-ListenAPI-Key": API_KEY,
      })}

      fetch(fullUrl, options)
        .then(async (data) => {
          if (data.ok) {
            data = await data.json()
            this.setState({podcast: {
              userInput: podcastInput, list: data.results
            }})
          } else {
            throw new Error(data.status + "Failed")
          }
        }).catch(e => alert('Search failed.' + e))
        Array.from(document.querySelectorAll('input')).forEach(
          input => (input.value = "")
        );  
  }

  render() {
    const contextValue = {
      getVehicle: this.state.getVehicle,
      getStartingLocation: this.getStartingLocation,
      getEndingLocation: this.getEndingLocation,
      getDistance: this.getDistance,
      getPodcasts: this.state.getPodcasts,
      startingLocation: this.state.startingLocation,
      endingLocation: this.state.endingLocation,
      podcast: this.state.podcast,
      travel: this.state.travel
    }
    return (
      <AppContext.Provider value={contextValue}>
        <div className='App'>
          <Routes>
            <Route path='/' element={<WelcomePage />} />
            <Route path='/start' element={<StartPage />} />
            <Route path='/end' element={<EndPage />} />
            <Route path='/podcast' element={<PodcastPage />} />
          </Routes>
        </div>  
      </AppContext.Provider>
    )
  }
}
