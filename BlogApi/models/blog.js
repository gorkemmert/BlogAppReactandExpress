import mongoose from "mongoose";

const blog = mongoose.Schema({
    title:String,
    desc: String,
    content: String,
    image:String,
    authorName: String,
    authorImg: String,
    authorDesc: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
});

const Blog = mongoose.model('Blog', blog);
export default Blog;