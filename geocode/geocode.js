const request = require('request');

let geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    let encodedAddress = encodeURIComponent(address);
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBJts_vCVZaXEgafo3It7bqc8_tGwr4ibM&address=${encodedAddress}`,
      json: true
    }, (error, response, body) => {
      if(body.status === "OK"){
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
      }else if(error){
        reject('Unable to connect to Google services.');
      }else if(body.status === "ZERO_RESULTS"){
        reject(`Unable to find that location: ${address}.`);
      }else{
        reject(body.error_message);
      }
    });
  })
}


module.exports = {
  geocodeAddress
};
