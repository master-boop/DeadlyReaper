require("dotenv").config()
const { Database } = require("quickmongo")
const mongoDBURL = process.env.MONGODBURL
const quickmongo = new Database(mongoDBURL)

module.exports = {
    name: "setup",
    aliases: ["set"],
    usage: ".set",
    description: "Sets up the server",
    UserPerms: ["ADMINISTRATOR"],
    cooldown: 5,

    async execute(client, message, cmd, args, Discord) {

        // If guild has no choice

        let choice = args[0]

        const toggleEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription("‼ - Please provide a valid option between 'enable' or 'disable'!")

        const noChoiceEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("No Choice Selected")
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setDescription("Type any description you want")
            .addField('\u200B', "__General__")
            .addField("Welcome Channel", "Section: `welcome`", true)
            .addField("Leave Channel", "Section: `leave`", true)
            .addField("Welcome Background", "Section: `welbg`", true)
            .addField("Welcome Message", "Section: `welmsg`", true)
            .addField("Auto Role", "Section: `autorole`", true)
            .addField("Member Role", "Section: `memberrole`", true)
            .addField("Prefix", "Section: `prefix`", true)
            .addField("Suggestion Channel", "Section: `suggestion`", true)
            .addField('\u200B', "__Moderation__")
            .addField("Logs Channel", "Section: `logs`", true)
            .addField("\u200B", "Features")
            .addField("AI Chatbot", "Section: `chatbot`", true)
            .addField("Anti-Link System", "Section: `antilink`", true)
            .addField("Anti-Curse System", "Section: `anticurse`", true)
            .addField("Levels", "Section: `levels`", true)
            .addField("Level Up Channel", "Section: `levelsup`", true)

        if (!choice) return message.reply({ embeds: [noChoiceEmbed] })

        // Getting the Welcome Channel Status

        const getWelcomeChannel = await quickmongo.get(`welcome-${message.guild.id}`)
        const welcomeChannelCheck = await quickmongo.fetch(`welcome-${message.guild.id}`)

        let welcomeChannelStatus
        // You've to write let, if you write const it won't work, cause const is not re-assignable

        if (welcomeChannelCheck) {
            welcomeChannelStatus = `<#${getWelcomeChannel}>`
        } else welcomeChannelStatus = "`No Channel Set`"

        // Getting the Welcome Background Status

        const getWelcomeImage = await quickmongo.get(`welimg-${message.guild.id}`)
        const welcomeImageCheck = await quickmongo.fetch(`welimg-${message.guild.id}`)

        let welcomeimageStatus

        if (welcomeImageCheck) {
            welcomeimageStatus = `[Custom Image](${getWelcomeImage})`
        } else welcomeimageStatus = '[Default Image](https://cdn.discordapp.com/attachments/850306937051414561/877186344965783614/WallpaperDog-16344.jpg)'

        // Getting the Welcome Message Status

        const welcomeMessageCheck = await quickmongo.fetch(`welmsg-${message.guild.id}`)
        let welcomeMessageStatus

        if (welcomeMessageCheck) {
            welcomeMessageStatus = `Custom Message`
        } else welcomeMessageStatus = 'Default Message'

        // Getting the Leave Channel Status

        const getLeaveChannel = await quickmongo.get(`leave-${message.guild.id}`)
        const leaveChannelCheck = await quickmongo.fetch(`leave-${message.guild.id}`)

        let leaveChannelStatus
        // You've to write let, if you write const it won't work, cause const is not re-assignable

        if (leaveChannelCheck) {
            leaveChannelStatus = `<#${getLeaveChannel}>`
        } else leaveChannelStatus = "`No Channel Set`"

        // Getting the Member Role Status

        const getMemberRole = await quickmongo.get(`memberrole-${message.guild.id}`)
        const memberRoleCheck = await quickmongo.fetch(`memberrole-${message.guild.id}`)

        let memberRoleStatus

        if (memberRoleCheck) {
            memberRoleStatus = `<@&${getMemberRole}>`
        } else memberRoleStatus = "`No Role Set`"

        // Getting the Auto Role Status

        const autoRoleCheck = await quickmongo.fetch(`autorole-${message.guild.id}`)

        let autoRoleStatus

        if (autoRoleCheck) {
            autoRoleStatus = "🟢 (ON)"
        } else autoRoleStatus = "🔴 (OFF)"

        // Getting the Chatbot Channel Status

        const getChatbotChannel = await quickmongo.get(`chatbot-${message.guild.id}`)
        const chatbotChannelCheck = await quickmongo.fetch(`chatbot-${message.guild.id}`)

        let chatbotChannelStatus

        if (chatbotChannelCheck) {
            chatbotChannelStatus = `<#${getChatbotChannel}>`
        } else chatbotChannelStatus = "`No Channel Set`"

        // Getting the Prefix Status

        const getPrefix = await quickmongo.get(`prefix-${message.guild.id}`)
        const prefixCheck = await quickmongo.fetch(`prefix-${message.guild.id}`)

        let prefixStatus;

        if (prefixCheck) {
            prefixStatus = `${getPrefix}`
        } else prefixStatus = "`Default Prefix: .`"

        // Getting the Levels Status

        const levelsCheck = await quickmongo.fetch(`levels-${message.guild.id}`)

        let levelsStatus

        if (levelsCheck) {
            levelsStatus = "🟢 (ON)"
        } else levelsStatus = "🔴 (OFF)"

        // Getting the Levels Up Channel Status

        const getLevelsUpChannel = await quickmongo.get(`levelsup-${message.guild.id}`)
        const levelsUpCheck = await quickmongo.fetch(`levelsup-${message.guild.id}`)

        let levelsUpStatus

        if (levelsUpCheck) {
            levelsUpStatus = `<#${getLevelsUpChannel}>`
        } else levelsUpStatus = "`No Channel Set`"

        // Getting the Logs Channel Status

        const getLogsChannel = await quickmongo.get(`logs-${message.guild.id}`)
        const logsChannelCheck = await quickmongo.fetch(`logs-${message.guild.id}`)

        let logsChannelStatus
        // You've to write let, if you write const it won't work, cause const is not re-assignable

        if (logsChannelCheck) {
            logsChannelStatus = `<#${getLogsChannel}>`
        } else logsChannelStatus = "`No Channel Set`"

        // Getting the Suggestion Channel Status

        const getSuggestionChannel = await quickmongo.get(`suggestion-${message.guild.id}`)
        const suggestionChannelCheck = await quickmongo.fetch(`suggestion-${message.guild.id}`)

        let suggestionChannelStatus
        // You've to write let, if you write const it won't work, cause const is not re-assignable

        if (suggestionChannelCheck) {
            suggestionChannelStatus = `<#${getSuggestionChannel}>`
        } else suggestionChannelStatus = "`No Channel Set`"

        // Getting the Anti link Status

        const antiLinkCheck = await quickmongo.fetch(`antilink-${message.channel.id}`)

        let antiLinkStatus

        if (antiLinkCheck) {
            antiLinkStatus = "🟢 (ON)"
        } else antiLinkStatus = "🔴 (OFF)"

        // Getting the Anti Curse Status

        const antiCurseCheck = await quickmongo.fetch(`anticurse-${message.guild.id}`)

        let antiCurseStatus

        if (antiCurseCheck) {
            antiCurseStatus = "🟢 (ON)"
        } else antiCurseStatus = "🔴 (OFF)"

        // Setting Up Anti Curse

        if (choice === "anticurse") {

            const toggling = ["disable", "enable"]
            if (!toggling.includes(args[1])) return message.reply({ embeds: [toggleEmbed] })

            if (args[1] === "enable") {

                if ((await quickmongo.fetch(`anticurse-${message.guild.id}`)) === null) {

                    await quickmongo.set(`anticurse-${message.guild.id}`, true)
                    return message.reply(`Anti-Curse System is now enabled!`)

                } else if ((await quickmongo.fetch(`anticurse-${message.guild.id}`)) === false) {

                    await quickmongo.set(`anticurse-${message.guild.id}`, true)
                    return message.reply(`Anti-Curse System is now enabled!`)

                } else return message.reply(`Anti-Curse System is already enabled!`)

            }

            if (args[1] === "disable") {

                if ((await quickmongo.fetch(`anticurse-${message.guild.id}`)) === true) {

                    await quickmongo.delete(`anticurse-${message.guild.id}`)
                    return message.reply("Anti-Curse System is now disabled")

                } else return message.reply("Anti-Curse System is already disabled!")

            }

        }

        // Setting Up Anti link

        if (choice === "antilink") {

            const toggling = ["disable", "enable"]
            if (!toggling.includes(args[1])) return message.reply({ embeds: [toggleEmbed] })

            if (args[1] === "enable") {

                if ((await quickmongo.fetch(`antilink-${message.channel.id}`)) === null) {

                    await quickmongo.set(`antilink-${message.channel.id}`, true)
                    return message.reply(`Link Protection System is now enabled for ${message.channel}!`)

                } else if ((await quickmongo.fetch(`antilink-${message.channel.id}`)) === false) {

                    await quickmongo.set(`antilink-${message.channel.id}`, true)
                    return message.reply(`Link Protection System is now enabled for ${message.channel}!`)

                } else return message.reply(`Link Protection System is already for ${message.channel}!`)

            }

            if (args[1] === "disable") {

                if ((await quickmongo.fetch(`antilink-${message.channel.id}`)) === true) {

                    await quickmongo.delete(`antilink-${message.channel.id}`)
                    return message.reply("Link Protection System is now disabled")

                } else return message.reply("Link Protection System is already disabled!")

            }

        }

        // Setting Up Welcome Message

        if (choice === 'welmsg') {

            const toggling = ["disable", "enable"]
            if (!toggling.includes(args[1])) return message.reply({ embeds: [toggleEmbed] })

            const welcomeMessage = args.slice(2).join(" ")

            const welmsgerrEmbed = new Discord.MessageEmbed()
                .setColor('#3d35cc')
                .setDescription('‼️ - Please provide your Custom Welcome Message!')

            const msgerrEmbed = new Discord.MessageEmbed()
                .setColor('#3d35cc')
                .setDescription("‼️ - The message must include one **{}**, to mention the user!\n\n**Example:** Hello {}!, welcome to our server, Zen. Hope you'll enjoy!")

            const welmsgyEmbed = new Discord.MessageEmbed()
                .setColor('#3d35cc')
                .setDescription(`✅ - The Custom Welcome Message is now set`)

            const welmsgnEmbed = new Discord.MessageEmbed()
                .setColor('#3d35cc')
                .setDescription(`✅ - The Custom Welcome Message has been removed & set to the Default one`)

            const welmsganEmbed = new Discord.MessageEmbed()
                .setColor('#3d35cc')
                .setDescription(`‼️ - No Custom Welcome Message is set till now!`)

            if (args[1] === 'enable') {

                if (!welcomeMessage) return message.reply({ embeds: [welmsgerrEmbed] })

                if (!welcomeMessage.includes("{}")) return message.reply({ embeds: [msgerrEmbed] })

                await quickmongo.set(`welmsg-${message.guild.id}`, welcomeMessage)
                message.reply({ embeds: [welmsgyEmbed] })

            }

            if (args[1] === 'disable') {

                if (!quickmongo.has(`welmsg-${message.guild.id}`)) return message.reply({ embeds: [welmsganEmbed] })

                await quickmongo.delete(`welmsg-${message.guild.id}`)
                message.reply({ embeds: [welmsgnEmbed] })

            }

        }

        // Setting Up Welcome Image

        if (choice === 'welbg') {

            const toggling = ["disable", "enable"]
            if (!toggling.includes(args[1])) return message.reply({ embeds: [toggleEmbed] })

            const welcomeImage = args[2]

            const welimgerrEmbed = new Discord.MessageEmbed()
                .setColor('#3d35cc')
                .setDescription('‼️ - Please provide an Image Link to setup as Welcome Background!')

            const linkerrEmbed = new Discord.MessageEmbed()
                .setColor('#3d35cc')
                .setDescription('‼️ - The image link you provided is not a valid one, you can only use image links uploaded to Discord in `.jpg` or `.png` format. Upload the image to Discord first & then copy-paste the link!')

            const welimgyEmbed = new Discord.MessageEmbed()
                .setColor('#3d35cc')
                .setDescription(`✅ - [Image](${welcomeImage}) is now set as Welcome Background`)

            const welimgnEmbed = new Discord.MessageEmbed()
                .setColor('#3d35cc')
                .setDescription(`✅ - Welcome Background is now set to [Default](https://cdn.discordapp.com/attachments/850306937051414561/877186344965783614/WallpaperDog-16344.jpg)`)

            const welimganEmbed = new Discord.MessageEmbed()
                .setColor('#3d35cc')
                .setDescription(`‼️ - Welcome Background is already set to [Default](https://cdn.discordapp.com/attachments/850306937051414561/877186344965783614/WallpaperDog-16344.jpg)`)

            if (args[1] === 'enable') {

                if (!welcomeImage) return message.reply({ embeds: [welimgerrEmbed] })

                if (!welcomeImage.startsWith("https://cdn.discordapp.com/attachments/") && !welcomeImage.endsWith(".jpg") && !welcomeImage.endsWith(".png")) return message.reply({ embeds: [linkerrEmbed] })

                await quickmongo.set(`welimg-${message.guild.id}`, welcomeImage)
                message.reply({ embeds: [welimgyEmbed] })

            }

            if (args[1] === 'disable') {

                if (!quickmongo.has(`welimg-${message.guild.id}`)) return message.reply({ embeds: [welimganEmbed] })

                await quickmongo.delete(`welimg-${message.guild.id}`)
                message.reply({ embeds: [welimgnEmbed] })

            }

        }

        // Setting up the Suggestion Channel

        if (choice === 'suggestion') {

            const toggling = ["disable", "enable"]
            if (!toggling.includes(args[1])) return message.reply({ embeds: [toggleEmbed] })

            const suggestionChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2])

            if (args[1] === "enable") {

                if (!suggestionChannel) return message.reply("Please mention a channel to set as Suggestion Channel!")

                quickmongo.set(`suggestion-${message.guild.id}`, suggestionChannel.id)

                message.reply(`${suggestionChannel} is now set as Suggestion Channel`)

            }

            if (args[1] === "disable") {

                if (!quickmongo.has(`suggestion-${message.guild.id}`)) return message.reply("Suggestion channel is already disabled!")

                await quickmongo.delete(`suggestion-${message.guild.id}`)
                message.reply("Suggestion Channel is now disabled")

            }

        }

        // Setting up the Logs Channel

        if (choice === 'logs') {

            const toggling = ["disable", "enable"]
            if (!toggling.includes(args[1])) return message.reply({ embeds: [toggleEmbed] })

            const logsChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2])

            if (args[1] === "enable") {

                if (!logsChannel) return message.reply("Please mention a channel to set as Logs Channel!")

                quickmongo.set(`logs-${message.guild.id}`, logsChannel.id)

                message.reply(`${logsChannel} is now set as Logs Channel`)

            }

            if (args[1] === "disable") {

                if (!quickmongo.has(`logs-${message.guild.id}`)) return message.reply("Logs channel is already disabled!")

                await quickmongo.delete(`logs-${message.guild.id}`)
                message.reply("Logs Channe is now disabled")

            }

        }

        // Setting Up Levels

        if (choice === "levels") {

            const toggling = ["disable", "enable"]
            if (!toggling.includes(args[1])) return message.reply({ embeds: [toggleEmbed] })

            if (args[1] === "enable") {

                if ((await quickmongo.fetch(`levels-${message.guild.id}`)) === null) {

                    await quickmongo.set(`levels-${message.guild.id}`, true)
                    return message.reply("Leveling System is now enabled!")

                } else if ((await quickmongo.fetch(`levels-${message.guild.id}`)) === false) {

                    await quickmongo.set(`levels-${message.guild.id}`, true)
                    return message.reply("Leveling System is now enabled!")

                } else return message.reply("Leveling System is already enabled!")

            }

            if (args[1] === "disable") {

                if ((await quickmongo.fetch(`levels-${message.guild.id}`)) === true) {

                    await quickmongo.delete(`levels-${message.guild.id}`)
                    return message.reply("Leveling System is now disabled")

                } else return message.reply("Leveling System is already disabled!")

            }

        }

        // Setting Up Levels Channel

        if (choice === "levelsup") {

            if (!levelsCheck) return message.reply("Set up Leveling System first!")

            const levelsUpChannel = message.mentions.channels.first()

            if (!levelsUpChannel) return message.reply("Please provide levels up channel first!")

            await quickmongo.set(`levelsup-${message.guild.id}`, levelsUpChannel.id)

            message.reply(`${levelsUpChannel} is now set as Levels Up Channel`)

        }

        // Setting Up Prefix

        if (choice === 'prefix') {

            const newPrefix = args[1]

            if (!newPrefix) return message.reply("Please provide a new Prefix!")

            if (newPrefix.length > 3) return message.reply("The new prefix can't be longer than 3 characters")

            await quickmongo.set(`prefix-${message.guild.id}`, newPrefix)

            message.reply(`The new Prefix is now set to ${newPrefix}`)

        }

        // Setting up the Chatbot Channel

        if (choice === 'chatbot') {

            const toggling = ["disable", "enable"]
            if (!toggling.includes(args[1])) return message.reply({ embeds: [toggleEmbed] })

            const chatbotChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2])

            if (args[1] === "enable") {

                if (!chatbotChannel) return message.reply("Please mention a channel to set as Chatbot Channel!")

                quickmongo.set(`chatbot-${message.guild.id}`, chatbotChannel.id)

                message.reply(`${chatbotChannel} is now set as Chatbot Channel`)

            }

            if (args[1] === "disable") {

                if (!quickmongo.has(`chatbot-${message.guild.id}`)) return message.reply("Chatbot channel is already disabled!")

                await quickmongo.delete(`chatbot-${message.guild.id}`)
                message.reply("Chatbot Channel is now disabled")

            }

        }

        // Setting up the Member Role

        if (choice === "memberrole") {

            const memberRole = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])

            if (!memberRole) return message.reply("Please mention a role to set as Member role!")

            await quickmongo.set(`memberrole-${message.guild.id}`, memberRole.id)

            message.reply(`${memberRole} is now set as Member Role`)

        }

        // Setting up the Auto Role

        if (choice === "autorole") {

            const toggling = ["disable", "enable"]
            if (!toggling.includes(args[1])) return message.reply({ embeds: [toggleEmbed] })

            if (args[1] === "enable") {

                if (!memberRoleCheck) return message.reply("Set up the Member Role first!")

                if ((await quickmongo.fetch(`autorole-${message.guild.id}`)) === null) {

                    await quickmongo.set(`autorole-${message.guild.id}`, true)
                    return message.reply("Auto role is now enabled!")

                } else if ((await quickmongo.fetch(`autorole-${message.guild.id}`)) === false) {

                    await quickmongo.set(`autorole-${message.guild.id}`, true)
                    return message.reply("Auto role is now enabled!")

                } else return message.reply("Auto role is already enabled!")

            }

            if (args[1] === "disable") {

                if ((await quickmongo.fetch(`autorole-${message.guild.id}`)) === true) {

                    await quickmongo.delete(`autorole-${message.guild.id}`)
                    return message.reply("Auto role is now disabled")

                } else return message.reply("Auto role is already disabled!")

            }

        }

        // Setting up the Welcome Channel

        if (choice === 'welcome') {

            const toggling = ["disable", "enable"]
            if (!toggling.includes(args[1])) return message.reply({ embeds: [toggleEmbed] })

            const welcomeChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2])

            if (args[1] === "enable") {

                if (!welcomeChannel) return message.reply("Please mention a channel to set as Welcome Channel!")

                quickmongo.set(`welcome-${message.guild.id}`, welcomeChannel.id)

                message.reply(`${welcomeChannel} is now set as Welcome Channel`)

            }

            if (args[1] === "disable") {

                if (!quickmongo.has(`welcome-${message.guild.id}`)) return message.reply("Welcome channel is already disabled!")

                await quickmongo.delete(`welcome-${message.guild.id}`)
                message.reply("Welcome Channe is now disabled")

            }

        }

        // Setting up the Leave Channel

        if (choice === 'leave') {

            const toggling = ["disable", "enable"]
            if (!toggling.includes(args[1])) return message.reply({ embeds: [toggleEmbed] })

            const leaveChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2])

            if (args[1] === "enable") {

                if (!leaveChannel) return message.reply("Please mention a channel to set as Leave Channel!")

                quickmongo.set(`leave-${message.guild.id}`, leaveChannel.id)

                message.reply(`${leaveChannel} is now set as Leave Channel`)

            }

            if (args[1] === "disable") {

                if (!quickmongo.has(`leave-${message.guild.id}`)) return message.reply("Leave channel is already disabled!")

                await quickmongo.delete(`leave-${message.guild.id}`)
                message.reply("Leave Channel is now disabled")

            }

        }

        // Getting Server's Config

        if (choice === 'config') {

            const configEmbed = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle(`${message.guild.name} Server's Configuration`)
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .setDescription("Type any description you want")
                .addField('\u200B', "__General__")
                .addField("Welcome Channel", `${welcomeChannelStatus}`, true)
                .addField("Leave Channel", `${leaveChannelStatus}`, true)
                .addField("Welcome Image", `${welcomeimageStatus}`, true)
                .addField("Welcome Message", `${welcomeMessageStatus}`, true)
                .addField("Auto Role", `\`${autoRoleStatus}\``, true)
                .addField("Member Role", `${memberRoleStatus}`, true)
                .addField("Prefix", `\`${prefixStatus}\``, true)
                .addField("Suggestion Channel", `${suggestionChannelStatus}`, true)
                .addField('\u200B', "__Moderation__")
                .addField("Logs Channel", `${logsChannelStatus}`, true)
                .addField("\u200B", "Features")
                .addField("AI Chatbot", `${chatbotChannelStatus}`, true)
                .addField("Anti-Link System", `\`${antiLinkStatus}\``, true)
                .addField("Anti-Curse System", `\`${antiCurseStatus}\``, true)
                .addField("Levels", `\`${levelsStatus}\``, true)
                .addField("Level Up Channel", `${levelsUpStatus}`, true)

            message.reply({ embeds: [configEmbed] })

        }

    }

} 