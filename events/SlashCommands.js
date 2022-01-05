const client = require("../index")
const Discord = require("discord.js")

client.on("interactionCreate", async (interaction) => {

    if (interaction.user.bot || !interaction.guild) return

    if (interaction.isCommand()) {

        const nocmdEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription("‼ - An error occured! There's a possibility that the command has been removed!")

        let cmd = client.slash_commands.get(interaction.commandName)

        if (!cmd) return interaction.reply({ embeds: [nocmdEmbed] })

        await interaction.deferReply().catch(e => { })

        let options = interaction.options._hoistedOptions

        cmd.run(client, interaction, options)

    }

})