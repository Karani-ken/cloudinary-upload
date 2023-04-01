const express = require('express')
const cors = require('cors')
const db = require('./src/db/mongoose')
const productRouter = require('./src/routers/productRouter')
const app = express()

const port = process.env.PORT || 4000

app.use(express.json())
app.use(cors())
app.use(productRouter)

app.listen(port, ()=>{
  console.log(`server is running on ${port}`)
})