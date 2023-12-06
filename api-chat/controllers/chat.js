/** Import des module nécessaires */
const DB = require("../db.config");
const Chat = DB.Chat;

exports.getMyChats = (req, res) => {
    Chat.findAll({ include: DB.Message })
        .then( chats => res.json({ data: chats }))
        .catch( err => res.status(500).json({ message: 'Erreur de Base de Données.', error: err}))
}

exports.getChat = async (req, res) => {
    try{
        let chatId = parseInt(req.params.id)
        
        /** Validation des données reçues */
        if(!chatId){
            return res.json(400).json({ message: 'Paramètres manquants.'})
        }
    
        let chat = await Chat.findOne({ where: {id: chatId}, raw: true})
        
        /** Vérification de l'existance du chat */
        if((chat === null)){
            return res.status(404).json({ message: 'Chat introuvable.'})
        }
    
        /** Chat trouvé & réponse */
        return res.json({data: chat})
    }
    catch(err) {
        res.status(500).json({message: 'Erreur de Base de Données.', error: err})
    }
}

exports.createChat = async (req,res) => {
    try{
        const { content, chatId } = req.body

        /** Validation des données */    
        if(!content || !chatId){
            return res.status(400).json({ message: 'Données manquantes.'})
        }

        /** Récupération de l'ID de l'utilisateur connecté */
        req.body.user_id = req.decodedToken.id

        /** Creation du chat & réponse*/ 
        await Chat.create(req.body)
        
        return res.json({ message: 'Chat Crée.', data: user })
    }
    catch(err) {
        res.status(500).json({message: 'Erreur de Base de Données.', error: err})
    }
}