const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
    title: String,
    created:{
        type: Date,
        default: Date.now
    },
    image:{
        type: Schema.Types.ObjectId,
        ref:'Image'
    },
    content:String,
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    like: [],
    view: []
})

const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog