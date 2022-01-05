const fs = require("fs")
const { readdirSync } = fs
const client = require("../index")

readdirSync("./slashCommands").forEach(async (dir) => {

    const commands = readdirSync(`./slashCommands/${dir}/`).filter((file) => file.endsWith(".js"))

    commands.map(async cmd => {

        let file = require(`../slashCommands/${dir}/${cmd}`)
        let name = file.name || "No Command name"
        let description = file.description || "No Description" 
        let options = file.options || []

        const data = {
            name,
            description,
            options
        }

        let option = name == "No Command Name" ? '❌' : '✅'

        if (option === '✅') {

            setTimeout(async () => {
                client.slash_commands.set(name, {
                    ...data,
                    run: file.run
                })

                // If you want to make your slash commands global, replace the line below with this:
                // await client.application.commands.create(data)

                await client.guilds.cache.get("914071722821558302").commands.create(data)
            }, 30000)

        }

    })
})