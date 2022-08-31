const request = require('request')

//resuable code to get the data of different cities just by calling it
const geocode = (address, callback) => {
    const url = 'https://api.geoapify.com/v1/geocode/search?text=' + encodeURIComponent(address) +'&apiKey=fe40dce65ce44330ad20cad453503332&limit=1'
    request ({url: url, json: true}, (error, response) => {
        if(error) {
            callback('Unable to conect to location services!', undefined)
        }
        else if(response.body.features.length === 0) {
         callback('Unable to find the location. Try again.', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].properties.lat,
                longitude: response.body.features[0].properties.lon,
                location: response.body.features[0].properties.name
            })
        }
    })
}

module.exports = geocode
