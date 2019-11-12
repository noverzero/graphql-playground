const express = require('express')
const app = express()
const graphqlHTTP = require ('express-graphql')
const schema = require ('./schema')
const fetch = require('node-fetch')
const util = require('util')
const parseXML = util.promisify(require('xml2js').parseString)
const DataLoader = require('dataloader')

const fetchAuthor = id =>
fetch(`https://www.goodreads.com/author/show.xml?id=${id}&key=TUydpVGlWHngTLaoNOwBnQ `)
  .then(response => response.text())
  .then(parseXML)

const fetchBook = id =>
  fetch(`https://www.goodreads.com/book/show/${id}.xml?key=TUydpVGlWHngTLaoNOwBnQ`)
    .then(response => response.text())
    .then(parseXML)

const authorLoader = new DataLoader(keys =>
  Promise.all(keys.map(fetchAuthor)))

const bookLoader = new DataLoader(keys =>
  Promise.all(keys.map(fetchBook)))


app.use('/graphql', graphqlHTTP(req => {
  const authorLoader = new DataLoader(keys =>
    Promise.all(keys.map(fetchAuthor)))

  const bookLoader = new DataLoader(keys =>
    Promise.all(keys.map(fetchBook)))

  return {
      schema: schema,
      context: {
        authorLoader,
        bookLoader
      },
      graphiql: true
    }

  })
)

app.listen(4000)
console.log('listening!!! ')
