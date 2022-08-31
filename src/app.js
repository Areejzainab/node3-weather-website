const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express() //created express application

//setting the path for public folder
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//set up handlebars engine location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather',
        name : 'Areej Zainab'
    })
})

app.get('/about', (req , res) => {
    res.render('about', {
        title : 'ABOUT',
        name: 'Areej Zainab'
    })
})

app.get('/help', (req, res) => {
    res.render('help' , {
        helpText : 'This is some help text for you.',
        title : 'Help',
        name : 'Areej Zainab'
    })
})


app.get('/weather', (req , res) => {
    if(!req.query.address) {
        return res.send({
           error: 'Please give the proper address.'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {} ) => {   //by setting a default object as {} we make sure that the code still works even if no data is provided 
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })


})
app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })

    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
   res.render('404', {
    title: '404 help',
    name : 'Areej Zainab',
    errorMessage: 'Help article not found.'

   })
})


app.get('*' , (req, res) => {
    res.render('404', {
        title: '404',
        name : 'Areej Zainab',
        errorMessage: 'Page not found'
    })
})


//a method to start up the server
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})