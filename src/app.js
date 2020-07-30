const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
// setting for port and run the app website
const port = process.env.PORT || 3000

// Defines path for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory page
app.use(express.static(publicDirPath))

app.get('', (req,res)=>{
    res.render('index',{
        title:'My Weather App',
        name: 'Asra Avisena'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        title: 'Help',
        name: 'Asra'
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title:'About this Page',
        name: 'Asra A'
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Your Address can not find'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}= {} ) => {
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error, forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
})

app.get('/products', (req,res)=>{
    // req.query = provide req in query
    // return to stop app on that scope
    if(!req.query.search){
        return res.send({
            ERROR: 'Your searching can not find'
        })
    }

    res.send([{
        prodoucts: [],
        Age: 17
    },
    {
       name: 'Depok',
       age: 24 
    }])
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        errorMsg: 'Article in Help',
        name: 'Asra A'
    })
})

// * match anything that has not been match so far 
app.get('*', (req,res)=>{
    res.render('404',{
        title: '404',
        errorMsg: 'Page',
        name: 'Asra'
    })
})

app.listen(port, ()=>{
    console.log('Server is UP on ' + port )
})