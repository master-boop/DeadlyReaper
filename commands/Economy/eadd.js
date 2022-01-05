module.exports = {
    name: 'eadd',
    description: "Adds money to Economy Account",
    usage: ".add <amount> <@user>",

    async execute(client, message, cmd, args, Discord) {

        let member

        if (!args[1]) {

            member = message.member

        } else {

            member = message.mentions.members.first() || message.guild.members.cache.get(args[1]) || message.guild.members.cache.find(m => m.displayName.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(m => m.user.username.toLowerCase() === args[0].toLocaleLowerCase())

            if (!member) return message.reply({ content: "Can't find the member!" })

        }

        const coinsAdd = args[0]

        if (!coinsAdd) return message.reply("Mention the amount of coins!")
        if (isNaN(coinsAdd)) return message.reply("Coins amount must be an integer!")

        client.add(member.id, parseInt(coinsAdd))

        message.reply({ content: `${message.author} has added \`${coinsAdd} Coins\` to ${member}'s Account'` })

    }
}