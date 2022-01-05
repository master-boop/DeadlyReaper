const client = require('../index')
const Schema = require('../models/mute')

client.on('guildMemberAdd', async (member) => {

    const data = await Schema.findOne({ Guild: member.guild.id })
    if (!data) return;

    const user = data.Users.findIndex((prop) => prop === member.id)
    if (user < 0) return;

    const role = member.guild.roles.cache.find((role) => role.name === 'Muted')

    member.roles.add(role.id).catch(err => {

        if (err) return console.log(err)

    })

})