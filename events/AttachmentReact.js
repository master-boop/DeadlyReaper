const client = require('../index')

client.on("messageCreate", async (message) => {

    if (message.author.bot || !message.guild) return

    if (!message.guild.me.permissions.has("ADD_REACTIONS")) return

    if (message.attachments.size > 0) {

        const emojiA = message.client.emojis.cache.get("881510955836665916")
        const emojiB = message.client.emojis.cache.get("881510771761225778")

        await message.react(`${emojiA}`)
        await message.react(`${emojiB}`)

    } else return

})