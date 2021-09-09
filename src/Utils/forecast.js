const request=require('postman-request')

const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=08c823d1d1af1189c2200a0097829472&query='+latitude+','+longitude
    
    request({url, json:true},(error,{body}={})=>{
        if(error){
            callback('Unable to connect to weather service',undefined)
        } else if(body.error){
            callback('Unable to find location',undefined)
        } else{
            callback(undefined,{
                locationInfo:body.location,
                currentWeather:body.current
            })
        }
    })
    
}

module.exports=forecast