const ms = require("ms")
const Discord = require("discord.js")

module.exports = {
    name: 'kick',
    description: "Kicks a member",
    options: [
        {
            name: "user",
            description: "Select a user",
            type: 6,
            required: true
        },
        {
            name: "reason",
            description: "State a reason to kick",
            type: 3,
            required: false
        },
    ],

    run: async (client, interaction, options) => {

        try {

            const member = interaction.options.getMember("user")

            let reason = interaction.options.getString("reason") || "No reason provided"

            if (interaction.member.roles.highest.position <= member.roles.highest.position) return interaction.followUp("You cannot kick a member of your same level or higher!")

            if (interaction.guild.me.roles.highest.position <= member.roles.highest.position) return interaction.followUp("I cannot kick a member of my same level or higher!")

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

            let kickEmbed = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription(`${member} has successfully been kicked for : ${reason}`)

            let kickEmbed2 = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription(`Cancelled kick request!`)

            const kickPage = await interaction.followUp({ embeds: [kickAskEmbed], components: [row] })

            const col = await kickPage.createMessageComponentCollector({
                componentType: "BUTTON",
                time: ms('10s'),
            })

            col.on('collect', i => {

                if (i.user.id !== interaction.user.id) return

                if (i.customId === 'kickyes') {

                    member.kick({ reason })

                    member.send(`You've been kicked from **${interaction.guild.name}** by ${interaction.user} for : ${reason}`).catch(err => console.log(err))

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