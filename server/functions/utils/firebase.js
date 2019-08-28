const firebase = require('firebase')
const config = require('./config')

module.exports = firebase.initializeApp(config)