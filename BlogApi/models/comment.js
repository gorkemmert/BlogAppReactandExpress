import mongoose from "mongoose";

const comment = mongoose.Schema({
    content: String,
    authorName: String,
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
});

const Comment = mongoose.model('Comment', comment);
export default Comment;