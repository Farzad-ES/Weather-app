const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./Utils/geocode')
const forecast=require('./Utils/forecast')

const app=express()

//Paths definitions for express configs
const publicDirectory=path.join(__dirname,'../public')
const partialsPath=path.join(__dirname, '../templates/partials')
const viewsPath=path.join(__dirname, '../templates/views')

//Express setting for serving up static assets
app.use(express.static(publicDirectory))

//Express settings for handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Route handlers for different pages
app.get('',(req,res)=>{
    res.render('index',{
        name:'Farzad',
        title:'Weather'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Farzad'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        helpMessage:'You can get help in this page',
        name:'Farzad'
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please provide an address'
        })
    }

    const address=req.query.address
    geocode(address,(error,{latitude:lat,longitude:long,placeName}={})=>{
        if(error){
            return res.send({
                error
            })
        }

        forecast(lat,long,(error,{currentWeather}={})=>{
            if(error){
                return res.send({
                    error
                })
            }

            res.send({
                address,
                Location:placeName,
                Latitude:lat,
                Longitude:long,
                Forecast:currentWeather.weather_descriptions[0],
                Current_temperature:currentWeather.temperature,
                Feels_like_temperature:currentWeather.feelslike
            })
        })
    })
    
})

app.get('/help/*',(req,res)=>{
    res.render('404Page',{
        errorMessage:'Help article not found',
        name:'Farzad',
        title:'404'
    })
})

app.get('*',(req,res)=>{
    res.render('404Page',{
        errorMessage:'Page not found',
        name:'Farzad',
        title:'404'           
    })
})


app.listen(3000,()=>{
    console.log("Server is up on port 3000")
})