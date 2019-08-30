const request= require('request')

const forecast = (lat,long, callback) => {
    const url = 'https://api.darksky.net/forecast/beafdaa2e1a6a2fb8d03ef42a7867b3f/'+ lat+','+long +'?units=si'

    request({url, json: true},(error, {body})=>{
        if(error){
            callback('Unable to connect to forecast service!!', undefined)
        }else if(body.error){
            callback('Can not find location. TRY AGAIN!!!!!', undefined)
        }else{
            callback(undefined,body.daily.data[0].summary+' Its currently ' + body.currently.temperature 
            + ' degrees out. There is a ' +  body.currently.precipProbability + '% chance of rain' 
            + '. The humid is ' + body.currently.humidity + '. High temperature today is ' + body.daily.data[0].temperatureHigh 
            +'. Low temperature today is ' + body.daily.data[0].temperatureLow
            // {
            //     temperature: response.body.currently.temperature,
            //     chanceOfRain: response.body.currently.precipProbability                
            // })
            )}
    })
}

module.exports = forecast