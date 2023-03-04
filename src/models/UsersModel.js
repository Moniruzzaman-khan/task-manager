const mongoose= require('mongoose');
const DataSchema=mongoose.Schema({
        firstName: {type: String},
        lastName: {type: String},
            email: {type: String,unique:true},
        mobile: {type: String},
        password: {type: String},
        photo: {type: String},
        createDate: {type: Date, default: Date.now()}
    },
    {versionKey:false}
)

const UsersModel=mongoose.model('users',DataSchema);
module.exports=UsersModel;