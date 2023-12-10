const express = require('express')
const dotenv = require("dotenv")
const route = require('./router')
const app = express()

dotenv.config()


app.use(express.json())
app.use(route)

app.use("/assets", express.static("assets"));

app.listen(process.env.APP_PORT, () => {
  console.log(`Example app listening on port ${process.env.APP_URL}:${process.env.APP_PORT}`)
})