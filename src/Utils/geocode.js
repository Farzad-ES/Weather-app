const request=require('postman-request')

const geocode=(location,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(location)+'.json?access_token=pk.eyJ1IjoiZmFyemFkLWVzIiwiYSI6ImNrc2s0YnR4dTIwNmIyb29mdGh2ZW1mMHUifQ.a8ur5hM43T19fEM-Du9FOw&limit=1'
    
    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback('Unable to connect to the location service',undefined)
        } else if(body.features.length===0){
            callback('No match found',undefined)
        } else if(body.message){
            callback('Unable to find the location',undefined)
        } else{
            callback(undefined,{
                longitude:body.features[0].center[0],
                latitude:body.features[0].center[1],
                placeName:body.features[0].place_name
            })
        }
    })
}

module.exports=geocode