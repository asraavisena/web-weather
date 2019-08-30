const request= require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+ '.json?access_token=pk.eyJ1Ijoia2hhdHRvcmkiLCJhIjoiY2p6dmIxanhtMGU3dTNicDkzczJ5Z2djNCJ9.4TXcA0SlqZMNDZXkLohfPw&limit=1'

    request({url, json: true},(error, {body})=>{
        if(error){
            callback('Unable to connect to location service!!', undefined)
        }else if(body.features.length===0){
            callback('Can not find location. try again, please!', undefined)
        }else{
            callback(undefined,{
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }

    })
}

module.exports = geocode