const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')

module.exports = router.post('/send-mail', (req, res, next) => {
    let transporter = nodemailer.createTransport({
        // service: 'Gmail', // Recomendo usar o gmail
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'seu_email', // Seu email
            pass: 'senha_do_seu_email' // Senha do seu email
        }
    })
    
    let mailOptions = {
        from: `Site ${req.body.email}`,
        to: 'seu@email.com',
        subject: 'Nodemailer rocks!',
        html: `
            <h3>Nome: ${req.body.nome}</h3>
            <h3>Email: ${req.body.email}</h3>
            <h3>Telefone: ${req.body.telefone || ''}</h3>
            <h3>Mensagem:</h3>
            <p>${req.body.mensagem}</p>
        `
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.json({
                status: false,
                msg: 'O email não pôde ser enviado'
            })
            return console.log(error)
        } else {
            res.json({
                status: true,
                msg: 'Email enviado com sucesso!'
            })
            console.log('Message %s sent: %s', info.messageId, info.response)
        }
    })
})
