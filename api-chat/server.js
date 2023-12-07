/** Import des modules nécessaires */
const express = require('express')
const cors = require('cors')
const checkTokenMiddleware = require('./jsonwebtoken/check')

const socketIo = require('socket.io');
const Message = require('./models/message')

/** Import de la connexion à la DB */
let DB = require('./db.config');

/** Démarrage serveur avec test DB */
DB.sequelize.authenticate()
    .then(() => console.log('Connexion à la base de données OK.'))
    .catch(err => {
        console.log('Erreur de la connexion à la base de données.', err)
        process.exit(1)
    })
    
/** Initialisation de l'API */
const app = express()
const server = app.listen(process.env.SERVER_PORT,() => {
    console.log(`Le serveur s'exécute sur le port ${process.env.SERVER_PORT}.`)
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/** Initialisation du Socket */
const io = socketIo(server)

/** Connexion du client */
io.on('connection',(socket) => {
    console.log('Nouvelle connexion WebSocket')

    /** Ecoute des messages du client */
    socket.on('message', async (newMessage) => {
        try{
            /** Creation du message dans le base de données */
            const createdMessage = await Message.create(newMessage)

            /** Diffusion du message aux autres clients */
            socket.broadcast.emit('message', createdMessage);
        } catch (error) {
            console.log('Erreur lors de la création du message dans la base de données')
        }
    })

    /** Deconnexion du client */
    socket.on('disconnect', () => {
        console.log('Déconnexion WebSocket')
    })
})

/** Import des modules de routage */
const user_router = require('./routes/users')
const chat_router = require('./routes/chats')
const message_router = require('./routes/messages')

const auth_router = require('./routes/auth')

/** Mise en place du routage */
app.get('/',(req, res) => res.send("Bienvenue sur l'API CHAT !"))

app.use('/users', checkTokenMiddleware, user_router)
app.use('/chats', checkTokenMiddleware, chat_router)
app.use('/messages', checkTokenMiddleware, message_router)

app.use('/auth', auth_router)

app.get('*',(req, res) => res.status(501).send('Rien par ici.'))

