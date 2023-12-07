/** Import des module nécessaires */
const { Op } = require("sequelize");
const DB = require("../db.config");
const Chat = DB.Chat;
const User = DB.User;

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
        const { userIds } = req.body

        /** Validation des données */    
        if(!userIds){
            return res.status(400).json({ message: 'Données manquantes.'})
        }

        
        const users = await User.findAll({ where: { id: userIds }})

        /** Vérification de l'existance des utilisateurs */
        if(!users || users.length !== userIds.length) {
            return res.status(404).json({ message: 'Utilisateurs introuvables.'})
        }

        /** Vérification de l'existance d'un chat entre les utilisateurs */
        const existingChat = await Chat.findOne({
            where:{
                id: {
                    [Op.in]: userIds
                }
            },
            include: [{ model: User, as: 'users', where: { id: userIds }}]
        })

        if(existingChat){
            return res.status(400).json({ message: 'Il existe déja un chat entre les utilisateurs.'})
        }
        /** Creation du chat & réponse*/ 
        const chat = await Chat.create({})

        await chat.addUsers(users)
        
        return res.json({ message: 'Chat Crée.', data: chat })
    }
    catch(err) {
        res.status(500).json({message: 'Erreur de Base de Données.', error: err})
    }
}