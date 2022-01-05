const { MessageEmbed, Message, Client } = require("discord.js")
const { readdirSync } = require("fs")
require('dotenv').config()
const { Database } = require('quickmongo')
const mongoDBURL = process.env.MONGODBURL
const quickmongo = new Database(mongoDBURL)
let color = "RED"
const create_mh = require(`../../functions/menu`)

module.exports = {
    name: "help",
    aliases: [`h`],
    description: "Shows all available bot commands",
    usage: '.help or .help <category> or .help <command name>',
    cooldown: 1,

    async execute(client, message, cmd, args, Discord) {

        try {

            // Requiring the Prefix
            const prefixes = await quickmongo.fetch(`prefix-${message.guild.id}`)

            if (prefixes == null) {
                prefix = process.env.PREFIX
            } else {
                prefix = prefixes
            }

            let categories = []
            let cots = []

            if (!args[0]) {

                let ignored = ["simulation"]

                // Getting the Embed Emojis
                const emojiA = "😎"
                const emojiB = "😊"
                const emojiC = "🤩"
                const emojiD = "🙄"
                const emojiE = "😪"
                const emojiF = "😔"
                const emojiG = "🤐"
                const emojiH = "😴"
                const emojiI = "😓"
                const emojiJ = "🤑"
                const emojiK = "😅"
                const emojiL = "😐"

                // Categories from your Commands Folder
                const emo = {

                    Community: `${emojiA}`,
                    Information: `${emojiC}`,
                    Moderation: `${emojiB}`,
                    Utility: `${emojiE}`,
                    Owner: `${emojiK}`,

                }

                let ccate = []

                // Getting all the commands in each folder
                readdirSync("./commands/").forEach((dir) => {

                    if (ignored.includes(dir.toLowerCase())) return

                    const commands = readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith(".js"))

                    if (ignored.includes(dir.toLowerCase())) return

                    const name = `${emo[dir]} - ${dir}`

                    let nome = dir.toUpperCase()
                    let cats = new Object()

                    cats = {
                        name: name,
                        value: `\`${prefix}help ${dir.toLowerCase()}\``,
                        inline: true
                    }

                    categories.push(cats)
                    ccate.push(nome)
                })

                // Creating the main embed
                const helpEmbed = new MessageEmbed()
                    .setTitle(`Bot Commands`)
                    .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
                    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                    .setDescription(`My prefix for the server is \`${prefix}\`.\nTo view the help page of the commands, use \`${prefix}help [category]\` or \`${prefix}help [command]\`!`)
                    .addField('\u200B', '__Categories__')
                    .addFields(categories)
                    .addField('\u200B', '\u200B')
                    .addField('\u200B', `${emojiH} [Invite](https://discord.com/api/oauth2/authorize?client_id=927536890477961256&permissions=8&scope=bot) \`|\` ${emojiI} [Support Server](https://discord.gg/ssJHCT3y9S) \`|\` ${emojiG} [Vote]() \`|\` ${emojiJ} [Webpage]()`)
                    .setFooter('Help by Drago')
                    .setTimestamp()
                    .setColor(color)

                // Creating the menus
                let menus = create_mh(ccate)

                return message.reply({ embeds: [helpEmbed], components: menus.smenu }).then((msgg) => {

                    const menuID = menus.sid

                    const select = async (interaction) => {

                        if (interaction.customId != menuID) return

                        let { values } = interaction
                        let value = values[0]
                        let catts = []

                        // Requiring each file for the menus
                        readdirSync("./commands/").forEach((dir) => {

                            if (dir.toLowerCase() !== value.toLowerCase()) return
                            const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                                file.endsWith(".js")
                            )


                            const cmds = commands.map((command) => {

                                let file = require(`../../commands/${dir}/${command}`)

                                if (!file.name) return "No command name."

                                let name = file.name.replace(".js", "")

                                if (client.commands.get(name).hidden) return

                                let des = client.commands.get(name).description
                                let emo = client.commands.get(name).emoji
                                let emoe = emo ? `${emo} - ` : ``

                                let obj = {
                                    cname: `${emoe}\`${name}\``,
                                    des
                                }

                                return obj

                            })

                            let dota = new Object()

                            // Command state, whether the command is completed or not
                            cmds.map(co => {

                                if (co == undefined) return

                                dota = {
                                    name: `${cmds.length === 0 ? "In progress." : co.cname}`,
                                    value: co.des ? co.des : `No Description`,
                                    inline: true,
                                }
                                catts.push(dota)

                            })

                            cots.push(dir.toLowerCase())

                        })

                        // In-menu Embeds
                        if (cots.includes(value.toLowerCase())) {

                            const combed = new MessageEmbed()
                                .setTitle(`__${value.charAt(0).toUpperCase() + value.slice(1)} Commands!__`)
                                .setDescription(`Use \`${prefix}help\` followed by a command name to get more information on a command.\nFor example: \`${prefix}help ping\`.\n\n`)
                                .addFields(catts)
                                .setColor(color)

                            await interaction.deferUpdate()

                            return interaction.message.edit({
                                embeds: [combed],
                                components: menus.smenu
                            })

                        }

                    }

                    // So that only the message author can interact with the menu
                    const filter = (interaction) => {
                        return !interaction.user.bot && interaction.user.id == message.author.id
                    }

                    const collector = msgg.createMessageComponentCollector({
                        filter,
                        componentType: "SELECT_MENU"
                    })

                    collector.on("collect", select)
                    collector.on("end", () => null)

                })
                // If you face any error with the menus, remove `interaction.deferUpdate()` or the whole menu
                // The dynamic command will still work fine except the menu

            } else {

                // If there's a args[0] ===>>> there is a command or category name
                let catts = []

                // Requiring each file again
                readdirSync("./commands/").forEach((dir) => {

                    if (dir.toLowerCase() !== args[0].toLowerCase()) return
                    const commands = readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith(".js"))

                    const cmds = commands.map((command) => {

                        let file = require(`../../commands/${dir}/${command}`)

                        if (!file.name) return "No command name."

                        let name = file.name.replace(".js", "")

                        if (client.commands.get(name).hidden) return


                        let des = client.commands.get(name).description
                        let emo = client.commands.get(name).emoji
                        let emoe = emo ? `${emo} - ` : ``

                        let obj = {
                            cname: `${emoe}\`${name}\``,
                            des
                        }
                        return obj

                    })

                    let dota = new Object()

                    // Getting the command state again
                    cmds.map(co => {

                        if (co == undefined) return

                        dota = {
                            name: `${cmds.length === 0 ? "In progress." : `${prefix}` + co.cname}`,
                            value: co.des ? co.des : `No Description`,
                            inline: true,
                        }
                        catts.push(dota)
                    })

                    cots.push(dir.toLowerCase())
                })

                // Defining Command for getting the description, usage, alias etc.
                const command =
                    client.commands.get(args[0].toLowerCase()) ||
                    client.commands.find(
                        (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
                    )

                // Creating the embeds
                if (cots.includes(args[0].toLowerCase())) {

                    const combed = new MessageEmbed()
                        .setTitle(`__${args[0].charAt(0).toUpperCase() + args[0].slice(1)} Commands!__`)
                        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                        .setDescription(`Use \`${prefix}help\` followed by a command name to get more information on a command.\nFor example: \`${prefix}help ping\`.\n\n`)
                        .setTimestamp()
                        .setFooter('Help by Drago')
                        .addFields(catts)
                        .setColor(color)

                    return message.reply({
                        embeds: [combed]
                    })
                }

                if (!command) {

                    const embed = new MessageEmbed()
                        .setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands!`)
                        .setColor("RED")

                    return await message.reply({
                        embeds: [embed],
                        allowedMentions: {
                            repliedUser: false
                        },
                    })
                }

                // Creating the detailed command embed
                const embed = new MessageEmbed()
                    .setTitle("Command Details:")
                    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                    .addField("Command:", command.name ? `\`${command.name}\`` : "No name provided for this command.")
                    .addField("Aliases:", command.aliases ? `\`${command.aliases.join("` `")}\`` : "No aliases provided for this command")
                    .addField("Usage:", command.usage ? `\`${command.usage}\`` : "No usage provided for this command")
                    .addField("Command Description:", command.description ? command.description : "No description provided for this command")
                    .setFooter('Help by Drago')
                    .setTimestamp()
                    .setColor(color)

                return await message.reply({
                    embeds: [embed]
                })
            }

        } catch (err) {

            const errEmbed = new Discord.MessageEmbed()
                .setColor('#3d35cc')
                .setDescription("‼️ - An error occured while executing the command, please try again later!")

            message.reply({ embeds: [errEmbed] })

            console.log(err)

        }
        // Use try catch method for any errors

    }
} 