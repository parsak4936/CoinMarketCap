import {getGeo, getGeoByIp} from 'geoplugin';

// Get geolocation of a user's browser.
getGeo()
  .then(response => console.log(response)) // handle success
  .catch(error => console.log(error)) // handle error
  .then(() => {  }); // always executed

 