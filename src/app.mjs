import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import hbs from 'hbs';
import  {geocode}  from './utilis/geocode.mjs'
import  {forcast}  from './utilis/forcast.mjs'

const dirName = path.dirname(fileURLToPath(import.meta.url))
const viewsPath = path.join(dirName, '../templates/views')
const partialsPath = path.join(dirName, '../templates/partials')

const app = express()
const port = process.env.PORT || 3000

const publicDirPath = path.join(dirName, '../public');
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))


app.get('', (req, res) => {
  res.render('index', {
    title: 'weather app',
    name: 'moshe braun'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'about page',
    name: 'moshhh'
  })
})


app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({ error: 'you must provide search field' })
  }
  res.send(
    { products: [] }
  )
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'help page',
    name: 'man',
    helpText: 'me '
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'you need provide address'
    })
  }
  geocode(req.query.address, (error, { latitude, longitude }={}) => {
    if (error) {
      return res.send({
        error: error
      })
    }
    forcast(latitude, longitude, (error, forcastData) => {
      if (error) {
        return res.send({
          error: 'forcast func is failed'
        })
      }
      res.send({
        address: forcastData
      })
    })
  })
})

app.get('*', (req, res) => {
  res.send('my 404 page')
})
app.listen(port, () => {
  console.log('Server is up on port ' + port)
})