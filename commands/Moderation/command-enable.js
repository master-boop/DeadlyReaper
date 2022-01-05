const schema = require("../../models/commands")

module.exports = {
    name: "command-enable",
    aliases: ["cmde", "ce"],
    description: "Enables a disabled command",
    usage: ".cmde <command name>",
    UserPerms: ["ADMINISTRATOR"],
    cooldown: 5,

    async execute(client, message, cmd, args, Discord) {

        const cmds = args[0]

        if (!cmds) return message.reply('Please specify a command')

        if (!!client.commands.get(cmds) === false) return message.reply('This command does not exist')

        schema.findOne({ Guild: message.guild.id }, async (err, data) => {

            if (err) throw err;
            if (data) {

                if (data.Cmds.includes(cmds)) {

                    let commandNumber;

                    for (let i = 0; i < data.Cmds.length; i++) {
                        if (data.Cmds[i] === cmds) data.Cmds.splice(i, 1)
                    }

                    await data.save()
                    message.reply(`Enabled ${cmds}!`)

                } else return message.reply('That command isnt turned off.')
            }

        })
    }
}