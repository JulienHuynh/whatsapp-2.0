/** Import des module nécessaires */
const DB = require("../db.config");
const Message = DB.Message;
const Chat = DB.Chat;

exports.getMyMessages = (req, res) => {
    Message.findAll({ where: { user_id: req.decodedToken.id } })
        .then((messages) => res.json({ data: messages }))
        .catch((err) =>
            res
                .status(500)
                .json({ message: "Erreur de Base de Données.", error: err })
        );
};

exports.getMessage = async (req, res) => {
    try {
        let messageId = parseInt(req.params.id);

        /** Validation des données reçues */
        if (!messageId) {
            return res.json(400).json({ message: "Paramètres manquants." });
        }

        let message = await Message.findOne({ where: { id: messageId } });

        /** Vérification de l'existance du message */
        if (message === null) {
            return res.status(404).json({ message: "Message introuvable." });
        }

        /** Message trouvé & réponse */
        return res.json({ data: message });
    } catch (err) {
        res.status(500).json({ message: "Erreur de Base de Données.", error: err });
    }
};

exports.updateMessage = async (req, res) => {
    try {
        let messageId = parseInt(req.params.id);
        const userId = req.decodedToken.id;
        const { content } = req.body;

        /** Vérification de la presence et cohérence du champ id */
        if (!messageId || !content) {
            return res.status(400).json({ message: "Données manquantes." });
        }

        let message = await Message.findOne({
            where: { id: messageId },
            raw: true,
        });

        /** Vérification de l'existance du message */
        if (message === null) {
            return res.status(404).json({ message: `Message introuvable` });
        }

        /** Vérification si l'utilisateur est l'auteur du message */
        if (message.userId !== userId) {
            return res.status(403).json({ message: "Accès non autorisé." });
        }

        /** Création du message & réponse */
        await message.update({ content });

        return res.json({ message: "le message à été mis à jour." });
    } catch (err) {
        res.status(500).json({ message: "Erreur de Base de Données.", error: err });
    }
};

exports.createMessage = async (req, res) => {
    try {
        const { content, chatId } = req.body;
        const userId = req.decodedToken.id;

        const chat = await Chat.findOne({ where: { id: chatId } });

        /** Validation des données */
        if (!content || !chat) {
            return res.status(400).json({ message: "Données manquantes." });
        }

        /** Vérification si l'utilisateur est bien dans le chat */
        const userInChat = await chat.hasUser(userId);

        if (!userInChat) {
            return res
                .status(403)
                .json({ message: `L'utilisateur n'appartient pas au chat.` });
        }

        /** Creation du message */
        const message = await Message.create({
            content,
            userId,
            chatId,
        });

        return res.json({ message: "Message Crée.", data: message });
    } catch (err) {
        res.status(500).json({ message: "Erreur de Base de Données.", error: err });
    }
};

exports.deleteMessage = async (req, res) => {
    try {
        let messageId = parseInt(req.params.id);
        const userId = req.decodedToken.id;

        /** Vérification si le champ id est présent et cohérent */
        if (!messageId) {
            return res.status(400).json({ message: "Données manquantes." });
        }

        /** Vérification de l'existance du message */
        const message = await Message.findOne({ where: { id: messageId } });

        if (!message) {
            return res.status(404).json({ message: "Message introuvable." });
        }

        /** Vérification si l'utilisateur est l'auteur du message */
        if (message.userId !== userId) {
            return res.status(403).json({ message: "Accès non autorisé." });
        }

        /** Suppression du message & réponse */
        message.destroy();

        res.status(204).json({ message: "Message supprimé." });
    } catch (err) {
        res.status(500).json({ message: "Erreur de Base de Données.", error: err });
    }
};
