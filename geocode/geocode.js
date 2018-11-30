const request = require('request');

let geocodeAddress = (address, callback) => {
  let encodedAddress = encodeURIComponent(address);

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.GOOGLE_MAPS_API_KEY}&address=${encodedAddress}`,
    json: true
  }, (error, response, body) => {
    if(error){
      callback('Unable to connect to Google services.');
    }else if(body.status === "ZERO_RESULTS"){
      callback(`Unable to find that location: ${address}.`);
    }else if(body.status === "OK"){
      callback(undefined,{
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    }else{
      callback(body.error_message);
    }
  });
}


module.exports = {
  geocodeAddress
};
