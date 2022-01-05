const mongoose = require("mongoose")

const Schema = mongoose.Schema({

    Guild: String,
    Cmds: Array,

})

module.exports = mongoose.model("cmds", Schema)