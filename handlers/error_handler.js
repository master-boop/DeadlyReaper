const Discord = require("discord.js")

module.exports = (client) => {

    const errChannel = "916212692308607007"

    process.on('unhandledRejection', (reason, p) => {

        console.log(" [Anti-crash] :: Unhandled Rejection/Catch")
        console.log(reason, p)

        const errEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("⚠ New Error")
            .setDescription("An error just occured in the bot console!**\n\nERROR:\n\n** ```" + reason + "\n\n" + p + "```")
            .setTimestamp()
            .setFooter("Anti-Crash System")

        // client.channels.cache.get(errChannel).send({ embeds: [errEmbed] })

    })

    process.on('uncaughtException', (err, origin) => {

        console.log(" [Anti-crash] :: Uncaught Exception/Catch")
        console.log(err, origin)

        const errEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("⚠ New Error")
            .setDescription("An error just occured in the bot console!**\n\nERROR:\n\n** ```" + err + "\n\n" + origin + "```")
            .setTimestamp()
            .setFooter("Anti-Crash System")

        // client.channels.cache.get(errChannel).send({ embeds: [errEmbed] })

    })

    process.on('uncaughtExceptionMonitor', (err, origin) => {

        console.log(" [Anti-crash] :: Uncaught Exception/Catch (MONITOR)")
        console.log(err, origin)

        const errEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("⚠ New Error")
            .setDescription("An error just occured in the bot console!**\n\nERROR:\n\n** ```" + err + "\n\n" + origin + "```")
            .setTimestamp()
            .setFooter("Anti-Crash System")

        // client.channels.cache.get(errChannel).send({ embeds: [errEmbed] })

    })

    process.on('multipleResolves', (type, promise, reason) => {

        console.log(" [Anti-crash] :: Multiple Resolves")
        console.log(type, promise, reason)

        const errEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("⚠ New Error")
            .setDescription("An error just occured in the bot console!**\n\nERROR:\n\n** ```" + type + "\n\n" + promise + "\n\n" + reason + "```")
            .setTimestamp()
            .setFooter("Anti-Crash System")

        // client.channels.cache.get(errChannel).send({ embeds: [errEmbed] })

    })

}