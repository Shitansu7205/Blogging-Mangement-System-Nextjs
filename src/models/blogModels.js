const mongoose = require('mongoose')
import dbconfig from '../dbConfig/dbconfig'

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    }
})

// const Blog = new mongoose.model('Blog', blogSchema)

// Prevent overwriting the model
const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog