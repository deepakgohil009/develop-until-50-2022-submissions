const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

const productRoute = require("./routes/product")

// setting up PORT
const PORT = process.env.PORT || 3000

// configuring enviroment variables
dotenv.config()

const app = express()

// function to connect with database
const connect = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("Connected to database");
    } catch (error) {
        throw error
    }
}

//  middlewares
app.use(express.json())
app.use("/products", productRoute)

// error handler
app.use((req, res) => {
    res.status(400).send({ "error": "Something went wrong" })
})

// starting server to listen
app.listen(PORT, () => {
    connect()
    console.log("Server Started");
})