const schema = require("../../models/commands")

module.exports = {
    name: "command-disable",
    aliases: ["cmdd", "cd"],
    description: "Disables an enabled command",
    usage: ".cmdd <command name>",
    UserPerms: ["ADMINISTRATOR"],
    cooldown: 5,

    async execute(client, message, cmd, args, Discord) {

        const cmds = args[0];

        if (!cmds) return message.reply('Please specify a command')

        if (!!client.commands.get(cmds) === false) return message.reply('This command does not exist');

        schema.findOne({ Guild: message.guild.id }, async (err, data) => {

            if (err) throw err;
            if (data) {

                if (data.Cmds.includes(cmds)) return message.reply('This command has already been disabled.');
                data.Cmds.push(cmds)

            } else {

                data = new schema({
                    Guild: message.guild.id,
                    Cmds: cmds
                })

            }

            await data.save();
            message.reply(`Command ${cmds} has been disabled`)

        })
    }
}