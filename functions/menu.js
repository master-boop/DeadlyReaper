const chalk = require(`chalk`)
const { MessageSelectMenu, MessageActionRow } = require(`discord.js`)
const client = require("../index")

const create_mh = (array) => {

    if (!array) throw new Error(chalk.red.bold(`The options were not provided! Make sure you provide all the options!`))
    if (array.length < 0) throw new Error(chalk.red.bold(`The array has to have atleast one thing to select!`))
    let select_menu

    let id = `help-menus`
    let menus = []

    // Getting the Emojis
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

    // Categories present in your Commands Folder
    const emo = {

        Community: `${emojiA}`,
        Information: `${emojiC}`,
        Moderation: `${emojiB}`,
        Utility: `${emojiE}`,
        Owner: `${emojiK}`,

    }

    // This is for the Menu Options
    array.forEach(cca => {
        let name = cca
        let sName = `${name.toUpperCase()}`
        let tName = name.toLowerCase()
        let fName = name.toUpperCase()

        return menus.push({
            label: sName,
            description: `${tName} commands!`,
            value: fName
        })
    })

    // The Menu Message
    let chicken = new MessageSelectMenu()
        .setCustomId(id)
        .setPlaceholder(`Choose the command category`)
        .addOptions(menus)

    select_menu = new MessageActionRow()
        .addComponents(
            chicken
        )

    return {
        smenu: [select_menu],
        sid: id
    }
}

module.exports = create_mh