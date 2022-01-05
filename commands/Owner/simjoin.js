module.exports = {
    name: 'simjoin',
    aliases: ["join"],
    description: "Simulates join event",

    async execute(client, message, cmd, args, Discord) {

        if(message.author.id !== "536238813119381524") return message.reply("This command is classified!")

        client.on("guildMemberAdd", member => {
            message.channel.send("Simulated join event")
        })

        client.emit("guildMemberAdd", message.member)

    }
}