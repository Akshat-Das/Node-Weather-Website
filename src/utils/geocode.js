const request = require('request')

const geocode= (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +  '.json?access_token=pk.eyJ1IjoibWVkaWMxMiIsImEiOiJjbDVrbnNwMGUwYm9qM2JueGJxb2JsYjNlIn0.ItgohC_lYlT0MfXZkYGE3A'

    request({url,json:true},(error,{body}) =>{
        if(error){
            callback('Unable to connect to weather service!')
        }else if(body.features.length === 0){
            callback('Unable to get location')
        }else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                place: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode