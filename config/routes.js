const express = require('express')

module.exports = function(server) {
    const route = express.Router()
    server.use('/', route)

    const sendMail = require('../api/sendMail')
    server.post('/send-mail', sendMail)
}