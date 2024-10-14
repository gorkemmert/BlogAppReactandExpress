import mongoose from "mongoose";

const user = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "name zorunludur"]
    },
    surname: String,
    password: {type: String, required: [true, "password zorunludur"]}

});

const User = mongoose.model('User', user);
export default User;