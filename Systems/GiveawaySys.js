const { GiveawaysManager } = require('discord-giveaways')
// Requiring the model
const giveawayModel = require("../models/giveaway")

module.exports = (client) => {

    const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {

        async getAllGiveaways() {
            return await giveawayModel.find().lean().exec();
        }
    
        async saveGiveaway(messageId, giveawayData) {
    
            await giveawayModel.create(giveawayData);
            return true;
    
        }
    
        async editGiveaway(messageId, giveawayData) {
    
            await giveawayModel.updateOne({ messageId }, giveawayData, { omitUndefined: true }).exec();
            return true;
    
        }
    
        async deleteGiveaway(messageId) {
    
            await giveawayModel.deleteOne({ messageId }).exec();
            return true;
    
        }
    };
    
    const manager = new GiveawayManagerWithOwnDatabase(client, {
        default: {
            botsCanWin: false,
            embedColor: '#FF0000',
            embedColorEnd: '#000000',
            reaction: '🎉'
        }
    });
    
    client.giveawaysManager = manager;

}

// This is also present in the DOCS, copy & paste it
// Now, we're good to go