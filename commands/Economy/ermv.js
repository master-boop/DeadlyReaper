module.exports = {
    name: 'ermv',
    description: "Removes money from Economy Account",
    usage: ".ermv <amount> <@user>",

    async execute(client, message, cmd, args, Discord) {

        let member

        if (!args[1]) {

            member = message.member

        } else {

            member = message.mentions.members.first() || message.guild.members.cache.get(args[1]) || message.guild.members.cache.find(m => m.displayName.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(m => m.user.username.toLowerCase() === args[0].toLocaleLowerCase())

            if (!member) return message.reply({ content: "Can't find the member!" })

        }

        const coinsRmv = args[0]

        if (!coinsRmv) return message.reply("Mention the amount of coins!")
        if (isNaN(coinsRmv)) return message.reply("Coins amount must be an integer!")

        const userBal = await client.bal(member.id)

        if (coinsRmv > userBal) return message.reply(`${member} doesn't hace enough coins to be removed!`)

        client.rmv(member.id, parseInt(coinsRmv))

        message.reply({ content: `${message.author} has removed \`${coinsRmv} Coins\` from ${member}'s Account'` })

    }
}