const request = require('request');

let getWeather = (address, callback) => {
  request({
    url: `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${address.latitude},${address.longitude}?units=auto&exclude=[minutely,hourly,daily,flags,alerts]`,
    json: true
  }, (error, response, body) => {
    if(!error && response.statusCode === 200){
      callback(undefined,`Currently: ${body.currently.summary}, ${body.currently.temperature}˚F in ${address.address}.`);
    }else{
      callback('Unable to connect to DarkSky.');
    }
  });
}

module.exports = {
  getWeather
};
