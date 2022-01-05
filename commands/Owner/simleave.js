module.exports = {
    name: 'simleave',
    aliases: ["leave"],
    description: "Simulates leave event",

    async execute(client, message, cmd, args, Discord) {

        if(message.author.id !== "536238813119381524") return message.reply("This command is classified!")

        client.on("guildMemberRemove", member => {
            message.channel.send("Simulated leave event")
        })

        client.emit("guildMemberRemove", message.member)

    }
}