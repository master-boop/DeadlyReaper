const mongoose = require("mongoose")

const schema = mongoose.Schema({

    guildId: {
        type: String,
        required: true,
    },

    BLW: {
        type: Array,
        default: []
    }

})

module.exports = mongoose.model("anti-curse", schema)