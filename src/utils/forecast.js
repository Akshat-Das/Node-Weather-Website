const request = require('request')

const forecast = (lat,long,callback) =>{
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+ lat+ '&lon=' + long + '&appid=88c115331c5a695f2f907989e5f80181&units=metric'
    request({url,json:true},(error,{body}) => {
        if(error){
            callback('Unable to connect to weather service!')
        }else if(body.message){
            callback(body.message)
        }else{
            callback(undefined,"It is currently " + body.main.temp + " degrees outside. The humidity is " + body.main.humidity)
        }
    })
}

module.exports = forecast