const express = require('express')
const path = require('path')
const morgan = require('morgan')
const mysql = require('mysql')
const mysqlConn = require('express-myconnection')
const app = express()

// Import routes
const customerRoutes = require('./routes/customer');
const { urlencoded } = require('express')

// Settings
app.set('port', process.env.PORT || 3000)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Middlewares
app.use(morgan('dev'))
app.use(mysqlConn(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',
    database: 'nodebd'
}, 'single'))
app.use(express.urlencoded({extended: false}))

// Routes
app.use('/', customerRoutes)

// Static files
app.use(express.static(path.join(__dirname, 'public')))

// Starting the serve
app.listen(app.get('port'), () => {
    console.log('Servidor en puerto 3000')
})
