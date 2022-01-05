module.exports = {
    name: "ticket",
    description: "Creates a support ticket",
    aliases: ["support"],
    usage: ".ticket",
    BotPerms: ["MANAGE_CHANNELS"],
    UserPerms: ["ADMINISTRATOR"],

    async execute(client, message, cmd, args, Discord) {

        const tktEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(
                "__**How to make a ticket**__\n" + "> Click on the button below saying 'Create Ticket'\n" + "> Once the ticket is made, you'll be able to type in there!"
            )
            .setTitle("Tickets")
            .setFooter("Ticket by Zen")
            .setTimestamp()

        const bt = new Discord.MessageActionRow().addComponents(

            new Discord.MessageButton()
                .setCustomId("tic")
                .setLabel("🎫 Create Ticket!")
                .setStyle("PRIMARY")

        )

        message.channel.send({ embeds: [tktEmbed], components: [bt] })

    }

}