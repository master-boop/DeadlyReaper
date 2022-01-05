const ms = require("ms")

module.exports = {
    name: "kick",
    description: "Kicks a member",
    usage: ".kick",
    UserPerms: ["KICK_MEMBERS"],
    BotPerms: ["KICK_MEMBERS"],
    cooldown: 5,

    async execute(client, message, cmd, args, Discord) {

        try {

            if (!args[0]) return message.reply("Please mention a member first!")

            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.displayName.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(m => m.user.username.toLowerCase() === args[0].toLocaleLowerCase())

            if (!member) return message.reply("The user you provided is not valid in this guild, try using User ID or User Name or try to mention the member!")

            if (message.member.roles.highest.position <= member.roles.highest.position) return message.reply("You cannot kick a member of your same level or higher!")

            if (message.guild.me.roles.highest.position <= member.roles.highest.position) return message.reply("I cannot kick a member of my same level or higher!")

            const row = new Discord.MessageActionRow().addComponents(

                new Discord.MessageButton()
                    .setStyle('DANGER')
                    .setCustomId("kickyes")
                    .setLabel("Yes"),

                new Discord.MessageButton()
                    .setStyle("PRIMARY")
                    .setCustomId("kickno")
                    .setLabel("No"),

            )

            let kickAskEmbed = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("**⚠ - Do you really want to kick this member?**")

            let kickEndEmbed = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("Thanks for using [your bot name] to use this command")

            let reason = args.slice(1).join(" ")
            if (!reason) reason = "No reason provided"

            let kickEmbed = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription(`${member} has successfully been kicked for : ${reason}`)

            let kickEmbed2 = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription(`Cancelled kick request!`)

            const kickPage = await message.reply({ embeds: [kickAskEmbed], components: [row] })

            const col = await kickPage.createMessageComponentCollector({
                componentType: "BUTTON",
                time: ms('10s'),
            })

            col.on('collect', i => {

                if (i.user.id !== message.author.id) return

                if (i.customId === 'kickyes') {

                    // member.kick({ reason })

                    member.send(`You've been kicked from **${message.guild.name}** by ${message.author} for : ${reason}`).catch(err => console.log(err))

                    kickPage.edit({ embeds: [kickEmbed], components: [] })

                }

                else if (i.customId === 'kickno') {

                    kickPage.edit({ embeds: [kickEmbed2], components: [] })

                }

            })

            col.on('end', () => {

                kickPage.edit({ embeds: [kickEndEmbed], components: [] })

            })

        } catch (err) {
            console.log(err)
        }

    }

}