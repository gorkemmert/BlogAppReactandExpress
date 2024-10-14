import Blog from "../models/blog.js";

export const getBlog = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs)
    } catch (error) {
        res.status(404).json({
            message:error.message,
        });
    }
}

export const getSingleBlog = async (req, res) => {
    try {
        const {id} = req.params;
        const blog = await Blog.findById(id)
        res.status(200).json(blog)
    } catch (error) {
        res.status(404).json({
            message:error.message,
        });
    }
}

export const createBlog = async (req, res) => {
    
    try {
        const response = await Blog.create(req.body)
        if(response){
            res.status(201).json(req.body)
        }
    } catch (error) {
        res.status(409).json({
            message: error.message
        });
    }
}

export const updateBlog = async (req, res) => {
    const {id} = req.params;
    const post = req.body;
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(id, post, {new: true});
        res.json(updatedBlog)
    } catch (error) {
        res.status(409).json({
            message: error.message
        });
    }
}

export const deleteBlog = async (req, res) => {
    const {id} = req.params;
    try {
        
        const response = await Blog.findByIdAndDelete(id)
        res.json(response)
        
    } catch (error) {
        res.status(409).json({
            message: error.message
        });
    }
}