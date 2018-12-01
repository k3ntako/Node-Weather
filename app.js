require('dotenv').config()

const yargs = require('yargs');
const axios = require('axios')

const argv = yargs
  .options({
    a: {
      alias: "address",
      demand: true,
      describe: "Address for weather.",
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

let encodedAddress = encodeURIComponent(argv.address);
let geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBJts_vCVZaXEgafo3It7bqc8_tGwr4ibM&address=${encodedAddress}`;

axios.get(geocodeURL).then((response) => {
  if(response.data.status === "ZERO_RESULTS"){
    throw new Error('Unable to find that address.')
  }
  let latitude = response.data.results[0].geometry.location.lat
  let longitude = response.data.results[0].geometry.location.lng
  let weatherUrl =
  `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${latitude},${longitude}?units=auto&exclude=[minutely,hourly,daily,flags,alerts]`

  console.log(response.data.results[0].formatted_address);

  return axios.get(weatherUrl)
}).then((response) => {
  let summary = response.data.currently.summary;
  let temp = response.data.currently.temperature;
  console.log(`Currently: ${summary}, ${temp}˚F.`);
}).catch((e) => {
  if(e.message){
    console.log(e.message);
  }else{
    console.log("Could not reach Google Maps API.");
  }
})
