/** Import des module nécessaires */
const express = require('express')

const chatController = require('../controllers/chat');

/** Récupération du routeur express */
let router = express.Router()

/** Routage de la ressource Chat */
router.get('', chatController.getMyChats)

router.get('/:id', chatController.getChat)

router.put('', chatController.createChat)

module.exports = router