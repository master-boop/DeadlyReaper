module.exports = {
    name: 'ebal',
    description: "Shows money in Economy Account",
    usage: ".ebal <@user>",

    async execute(client, message, cmd, args, Discord) {

        let member

        if (!args[0]) {

            member = message.member

        } else {

            member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.displayName.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(m => m.user.username.toLowerCase() === args[0].toLocaleLowerCase())

            if (!member) return message.reply({ content: "Can't find the member!" })

        }

        const bal = await client.bal(member.id)

        message.reply({ content: `${member}'s current balance is : \`${bal} Coins\`` })

    }
}