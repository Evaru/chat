const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const usersSchema = new Schema({
    username: {type: String},
    password: {type: String},
    addedAt: {type: Date, default: Date.now}
},{
    versionKey: false,
    collation: "UsersCollection"
})

usersSchema.pre('save', function(next){
    if(this.isModified('password') || this.isNew()) this.password = bcrypt.hashSync(this.password,12)
    next()
})

module.exports = mongoose.model('UsersModel',usersSchema)