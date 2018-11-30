require('dotenv').config()

const yargs = require('yargs');
const geocode = require('./geocode/geocode')
const darksky = require('./darksky/darksky')

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

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if(errorMessage){
    console.log(errorMessage);
  }else{
    darksky.getWeather(results, (errorMessage, results) => {
      if(errorMessage){
        console.log(errorMessage);
      }else {
        console.log(results);
      }
    });
  }
});
