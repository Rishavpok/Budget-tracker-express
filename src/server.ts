import express  from 'express'
const app = express()
const port = 3000
app.use(express.json());

// Database setup

import mongoose from "mongoose";
mongoose.connect('mongodb://127.0.0.1:27017/budget-tracker_db');
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


// routes
import user from './controllers/users'


app.use('/api/users', user)

// app.get('/', async (req, res) => {
//   res.send('Hello world !!!!')
// } )

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})