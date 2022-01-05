const Discord = require("discord.js")
const client = require("../index")
const Schema = require("../models/money")

client.bal = (id) => new Promise(async ful => {

    const data = await Schema.findOne({ id })
    if (!data) return ful(0)

    ful(data.coins)

})

client.add = (id, coins) => {

    Schema.findOne({ id }, async (err, data) => {

        if (err) throw err

        if (data) {

            data.coins += coins

        } else {

            data = new Schema({ id, coins })

        }

        data.save()

    })

}

client.rmv = (id, coins) => {

    Schema.findOne({ id }, async (err, data) => {

        if (err) throw err

        if (data) {

            data.coins -= coins

        } else {

            data = new Schema({ id, coins: - coins })

        }

        data.save()

    })

}