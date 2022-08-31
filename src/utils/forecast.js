const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=f3e0c8d890e1419b7bd0db0c2eb4dc75&query=' + latitude + ',' + longitude + '&units=f'
    request ({url: url, json: true}, (error, response) => {
        if(error) {
            callback('Unable to conect to weather services!', undefined)
        }
        else if(response.body.error) {
         callback('Unable to find the location. Try again.', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions + ' It is currently ' 
               + response.body.current.temperature + ' fahrenheit out. There is ' + response.body.current.precip+ ' chance of rain.') 
        }
    })
}

module.exports = forecast