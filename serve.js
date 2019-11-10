const express = require('express')
const app = express()
const graphqlHTTP = require ('express-graphql')
const schema = require ('./schema')

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
  })
)

app.listen(4000)
console.log('listening!!! ')
