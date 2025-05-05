import express  from 'express'
const app = express()
const port = 3000

// const todoroute = require('./routes/todos')


// app.use('/', todoroute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})