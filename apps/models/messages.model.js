const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
    date: {type: Date},
    content: {type: String},
    username: {type: String}
},{
    versionKey: false,
    collation: "MessageCollection"
})

module.exports = mongoose.model('MessageModel',messageSchema)