const Discord = require("discord.js")
const ms = require("ms")

// The intro is a little complicated now
// We're going to make it like this one, that's why we need so many options

module.exports = {
    name: "give-away",
    description: "Start, end, pause, resume or reroll a give-away",
    UserPerms: ["MANAGE_GUILD"],
    BotPerms: ["ADD_REACTIONS", "MANAGE_MESSAGES"],
    cooldown: 5,
    options: [
        {
            name: "start",
            description: "Starts a give-away",
            type: "SUB_COMMAND",
            // We need the duration of the give-away, the winner number, the prize, the channel & the mentioned role (Optional)
            options: [
                {
                    name: "duration",
                    description: "Provide the duration of the giveaway (1m ,1h, 1d)",
                    type: "STRING",
                    required: true,
                },
                {
                    name: "winner-count",
                    description: "Provide the number of winners",
                    type: "INTEGER",
                    required: true,
                },
                {
                    name: "prize",
                    description: "Provide the prize",
                    type: "STRING",
                    required: true,
                },

                // The channel & role will be require: false
                {
                    name: "channel",
                    description: "Select the channel to send the giveaway",
                    type: "CHANNEL",
                    channelTypes: ["GUILD_TEXT"],
                    required: false,
                },
                {
                    name: "role",
                    description: "Select the role to mention",
                    type: "ROLE",
                    required: false,
                }
            ]
        },

        // Now we need this part, for give-away actions like, end, reroll, pause etc.
        {
            name: "actions",
            description: "Options for the give-away",
            type: "SUB_COMMAND",
            // Creating all the options
            options: [
                {
                    name: "options",
                    description: "Select an option",
                    type: "STRING",
                    required: true,
                    choices: [
                        {
                            name: "end",
                            value: "end"
                        },
                        {
                            name: "pause",
                            value: "pause"
                        },
                        {
                            name: "unpause",
                            value: "unpause"
                        },
                        {
                            name: "reroll",
                            value: "reroll"
                        },
                        {
                            name: "delete",
                            value: "delete"
                        },
                    ]
                },

                // We need the giveaway id to reroll or pause or etc
                {
                    name: "message-id",
                    description: "Provide the Message ID of the giveaway",
                    type: "STRING",
                    required: true,
                }
            ],
        },
    ],

    // Let's start

    run: async (client, interaction, options) => {

        // Requiring the SUB_COMMAND
        const Sub = interaction.options.getSubcommand()

        // Defining Embeds
        const errEmbed = new Discord.MessageEmbed()
            .setColor("RED")

        const sucEmbed = new Discord.MessageEmbed()
            .setColor("#3d35cc")

        // This is what I was talking about, the switch-case-break system in the last video
        // In simple words, if there are 5 cases, and a user chooses case 4, it's only gonna execute case 4, & won't even touch the other cases
        // Here, we're chaning the start & action case
        switch (Sub) {

            case "start": {

                // Defining all the variables
                const gChannel = interaction.options.getChannel("channel") || interaction.channel
                const duration = interaction.options.getString("duration")
                const winnerCount = interaction.options.getInteger("winner-count")
                const prize = interaction.options.getString("prize")
                const role = interaction.options.getRole("role") || []

                const tmenderrEmbed = new Discord.MessageEmbed()
                    .setColor('#3d35cc')
                    .setDescription("‼️ - The duration should be a number ending with 's'/'m'/'h'/'d'!")

                if (!duration.endsWith("s") && !duration.endsWith("m") && !duration.endsWith("h") && !duration.endsWith("d")) return interaction.followUp({ embeds: [tmenderrEmbed], ephemeral: true })

                // We need to save our data somewhere. We'll use MongoDB for that. Let's create model

                // This is our method to start a giveaway
                client.giveawaysManager.start(gChannel, {

                    duration: ms(duration),
                    winnerCount,
                    prize,
                    embedColor: "#3d35cc",
                    embedColorEnd: "#3d35cc",
                    // You can customize the messages if you want like I did. If you don't wanna customize it, just remove `messages`
                    // More edit options are available in the DOCS. Link in the description
                    messages: {

                        giveaway: `${role}\n\n🎉 **NEW GIVEAWAY** 🎉`,
                        giveawayEnded: "🎊 **GIVEAWAY ENDED** 🎊",
                        winMessage: '🎉 - Congratulations, {winners}! You\'ve won: **{this.prize}**!\n{this.messageURL}'

                    }

                }).then(async () => {

                    // Sending the success embed
                    sucEmbed.setDescription(`✅ - Giveaway has successfully been started in ${gChannel}`)
                    return interaction.followUp({ embeds: [sucEmbed], ephemeral: true })

                }).catch(err => {

                    // If any error comes, it's gonna send the error embed
                    errEmbed.setDescription(`‼️ - An error has occurred!\n\n\`Error: ${err}\``)
                    return interaction.followUp({ embeds: [errEmbed], ephemeral: true })

                    // Don't forget to add these `return`

                })

            }
                break;

            // We'll be now working on these part
            case "actions": {

                // We need the message id as I said 

                const choice = interaction.options.getString("options")
                const messageID = interaction.options.getString("message-id")

                // You must need this line, because if someone gets your give-away message id & runs any of the action commands, your giveaway message will be edited. So, we need to limit the giveaway to its original server.
                const giveaway = client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messageId === messageID)

                if (!giveaway) {

                    errEmbed.setDescription(`‼️ - Unable to find the giveaway with the Message ID: **${messageID}** in this server!`)
                    return interaction.followUp({ embeds: [errEmbed], ephemeral: true })

                }

                switch (choice) {

                    // When the give-away ends
                    case "end": {

                        // It's much easier in these steps, because you just need to write the function name after `client.giveawaysManager`, like `.end`, `.reroll` etc.
                        client.giveawaysManager.end(messageID).then(() => {

                            sucEmbed.setDescription(`✅ - The giveaway has been ended`)
                            return interaction.followUp({ embeds: [sucEmbed], ephemeral: true })

                        }).catch(err => {

                            errEmbed.setDescription(`‼️ - An error has occurred!\n\n\`Error: ${err}\``)
                            return interaction.followUp({ embeds: [errEmbed], ephemeral: true })

                        })

                    }
                        break;

                    // To pause the giveaway
                    case "pause": {

                        client.giveawaysManager.pause(messageID).then(() => {

                            sucEmbed.setDescription(`✅ - The giveaway has been paused`)
                            return interaction.followUp({ embeds: [sucEmbed], ephemeral: true })

                        }).catch(err => {

                            errEmbed.setDescription(`‼️ - An error has occurred!\n\n\`Error: ${err}\``)
                            return interaction.followUp({ embeds: [errEmbed], ephemeral: true })

                        })

                    }
                        break;

                    // To resume the give-away
                    case "unpause": {

                        client.giveawaysManager.unpause(messageID).then(() => {

                            sucEmbed.setDescription(`✅ - The giveaway has been resumed`)
                            return interaction.followUp({ embeds: [sucEmbed], ephemeral: true })

                        }).catch(err => {

                            errEmbed.setDescription(`‼️ - An error has occurred!\n\n\`Error: ${err}\``)
                            return interaction.followUp({ embeds: [errEmbed], ephemeral: true })

                        })

                    }
                        break;

                    // To reroll the giveaway
                    case "reroll": {

                        client.giveawaysManager.reroll(messageID).then(() => {

                            sucEmbed.setDescription(`✅ - The giveaway has been rerolled`)
                            return interaction.followUp({ embeds: [sucEmbed], ephemeral: true })

                        }).catch(err => {

                            errEmbed.setDescription(`‼️ - An error has occurred!\n\n\`Error: ${err}\``)
                            return interaction.followUp({ embeds: [errEmbed], ephemeral: true })

                        })

                    }
                        break;

                    // To delete the give-away
                    case "delete": {

                        client.giveawaysManager.delete(messageID).then(() => {

                            sucEmbed.setDescription(`✅ - The giveaway has been deleted`)
                            return interaction.followUp({ embeds: [sucEmbed], ephemeral: true })

                        }).catch(err => {

                            errEmbed.setDescription(`‼️ - An error has occurred!\n\n\`Error: ${err}\``)
                            return interaction.followUp({ embeds: [errEmbed], ephemeral: true })

                        })

                    }
                        break;

                }

            }
                break;

            // And that's it, let's try 
            default: {

                console.log("Error in giveaway command")

            }

        }

    }

}