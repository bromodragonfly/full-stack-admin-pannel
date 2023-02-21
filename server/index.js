import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import clientRoutes from './routes/client.js'
import generalRoutes from './routes/general.js'
import managmentRotes from './routes/managment.js'
import salesRoutes from './routes/sales.js'

//data import
import User from './models/user.js'
import Product from './models/Products.js'
import ProductStat from './models/ProductStats.js'
import { dataUser, dataProduct, dataProductStat } from './data/index'

// configuration
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
mongoose.set('strictQuery', true)

//routes
app.use('/clients', clientRoutes)
app.use('/general', generalRoutes)
app.use('/managment', managmentRotes)
app.use('/sales', salesRoutes)

//mongoose SETUP

const PORT = 4200
mongoose
    .connect('mongodb://localhost:27017', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server started on ${PORT}`)
        })

        /** ADD ONLY one time */
        // Product.insertMany(dataProduct)
        // ProductStat.insertMany(dataProductStat)
        // User.insertMany(dataUser)
    })
    .catch((error) => console.log(`Not connected`, error))
console.log(process.env.PORT)
