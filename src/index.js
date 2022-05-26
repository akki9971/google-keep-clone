const express = require('express')
const cors = require('cors')
require('../database/connectdb')
require('dotenv').config()

// console.log(process.env.PORT);

const port = process.env.PORT || 4040 
const app = express()

app.use(express.json())
app.use(cors())

app.get('/',(req, res) => {
    res.end(`
        hello, welcome to google keep clone api area.
        Please follow routes. 
        /notes to see notes   
    `)
})

// const a = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI4MGU5NGFlMDg5ZmNlNDQzMTU3M2Y0In0sImlhdCI6MTY1MjYxNTQ5OH0.UwilV8e3dx6n3t-6qKjz3_YCODtGYqVRxYaMmxdBVVc"
// const b = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI4MGU5NGFlMDg5ZmNlNDQzMTU3M2Y0In0sImlhdCI6MTY1MjYxNTU2NX0.CXPMOQqud_NzcDKthLlpfS6D1f9Bj-VYLvEjQiHYe30"
// console.log(a==b);

app.use('/notes', require('../routes/notes'))

app.use("/user" , require('../routes/user'))

app.listen(port,()=>{
    console.log(`listening on http://localhost:${port}`)
})