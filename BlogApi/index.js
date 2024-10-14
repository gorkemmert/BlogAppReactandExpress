import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors';
import blogRoute from './routes/blog.js';
import commentRoute from './routes/comment.js'
import userRoute from './routes/user.js';

const app = express();
dotenv.config();
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());


app.get('/', (req, res) =>{
    res.json({
        author: "Görkem",
        message: "Codding",
    })
})

app.use('/blog', blogRoute)
app.use('/comment', commentRoute)
app.use('/user', userRoute)

const PORT = process.env.PORT || 5000;
                       
mongoose.connect(process.env.CONNECTION_URL)
.then(()=>{
    app.listen(PORT, ()=> {
        console.log(`Server is running on port: ${PORT}`);
    })
})
.catch((error)=>{
    console.error(error.message);
})