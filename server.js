const PORT = process.env.PORT || 8000
const axios = require('axios')
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/', express.static('./index.html'))

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`))

app.post('/solve', (req,res) => {
  const options = {
    method: 'POST',
    url: 'https://sudoku-solver3.p.rapidapi.com/sudokusolver/',
    headers: {
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': '8e8cd9e0b5msh8013e732caa4f9bp19fb4djsn8c14c3d63a1e',
      'X-RapidAPI-Host': 'sudoku-solver3.p.rapidapi.com',
    },
    data: {
      input: req.body
    }
  };
  axios.request(options).then((response) => {
    console.log('hi')
    console.log(response.data)
    res.json(response.data)
    
  }).catch(function (error) {
    console.log('bye')
    console.error(error);
  });
})

