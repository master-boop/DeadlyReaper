const Discord = require("discord.js")
const client = require("../index")

client.on("interactionCreate", async (interaction) => {

    if (interaction.isButton()) {

        await interaction.deferUpdate()

        if (interaction.customId === "tic") {

            const ticChannel = await interaction.guild.channels.create(`ticket-${interaction.user.id}`, {

                type: "GUILD_TEXT",
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: ["VIEW_CHANNEL"],
                    },
                    {
                        id: interaction.user.id,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES", "EMBED_LINKS", "ADD_REACTIONS"]
                    },
                    {
                        id: client.user.id,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES", "EMBED_LINKS", "ADD_REACTIONS"]
                    }
                ]

            })

            const embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("Ticket")
                .setDescription("Hello there,\nThe staff will be here as soon as possible, mean-while tell us about your issue!\nThank You!")
                .setFooter("Ticket by Zen")
                .setTimestamp()
                .setAuthor(interaction.guild.name, interaction.guild.iconURL({ dynamic: true }))


            const tktsucEmbed = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription(`Your ticket has successfully been created at ${ticChannel}`)

            const del = new Discord.MessageActionRow().addComponents(

                new Discord.MessageButton()
                    .setCustomId("del")
                    .setLabel("🚮 Delete Ticket")
                    .setStyle("DANGER")

            )

            try {

                await ticChannel.send({ content: `Welcome ${interaction.user}`, embeds: [embed], components: [del] }).then(interaction.followUp({ embeds: [tktsucEmbed], ephemeral: true })).catch(err => console.log(err))

            } catch (err) {
                console.log(err)
            }

        } else if (interaction.customId === 'del') {

            const channel = interaction.channel

            channel.delete()

        }

    }

})