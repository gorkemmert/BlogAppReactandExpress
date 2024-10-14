import Comment from "../models/comment.js";

export const getComment = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments)
    } catch (error) {
        res.status(404).json({
            message:error.message,
        });
    }
}

export const getCommentbyBlogId = async (req, res) => {
    const blogId = req.params.id
    try {
        const comment = await Comment.find({blogId});
        res.status(200).json(comment)
    } catch (error) {
        res.status(404).json({
            message:error.message,
        });
    }
}

export const getSingleComment = async (req, res) => {
    try {
        const {id} = req.params;
        const blog = await Comment.findById(id)
        res.status(200).json(blog)
    } catch (error) {
        res.status(404).json({
            message:error.message,
        });
    }
}

export const createComment = async (req, res) => {
    try {
        const response = await Comment.create(req.body)
        if(response){
            res.status(201).json(req.body)
        }
    } catch (error) {
        res.status(409).json({
            message: error.message
        });
    }
}

export const updateComment = async (req, res) => {
    const {id} = req.params;
    const post = req.body;
    try {
        const updatedComment = await Comment.findByIdAndUpdate(id, post, {new: true});
        res.json(updatedComment)
    } catch (error) {
        res.status(409).json({
            message: error.message
        });
    }
}

export const deleteComment = async (req, res) => {
    const {id} = req.params;
    try {
        
        const response = await Comment.findByIdAndDelete(id)
        res.json(response)
        
    } catch (error) {
        res.status(409).json({
            message: error.message
        });
    }
}