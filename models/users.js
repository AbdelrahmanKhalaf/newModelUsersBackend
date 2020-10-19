const mongoose = require('mongoose');
const joi = require('joi')
const User = mongoose.model('users', new mongoose.Schema({
    name:
    {
        type: String,
        minlength: 3,
        maxlength: 315,
        required: true
    },
    email:
    {
        type: String,
        minlength: 8,
        maxlength: 315,
        required: true
    },
    phone:
    {
        type: String,
        minlength: 8,
        maxlength: 100,
        required: true
    },
    actvition:
    {
        type: Boolean,
        required: true,
        default: false
    },
    password:
    {
        type: String,
        minlength: 8,
        maxlength: 315,
        required: true
    },
    avatar:
    {
        type: String,
        default: 'uploads/avatar_1587657175473.png',

    }
}));
const Imgs = mongoose.model('imgs', new mongoose.Schema({
    avatar:
    {
        type: String,
        required: true
    }
}));
//reference documention
const responsibilityScemha = new mongoose.Schema({
    name_admin : 
    {
       type : String,
       required : true,
    },
   })
const jopsScemha = new mongoose.Schema({
    name_job :
    {
        type : String,
        required : true,
    }
})
const responsibility = mongoose.model('responsibility', responsibilityScemha)
const JobsName = mongoose.model('jposName', jopsScemha )
const Employs = mongoose.model('employs', new mongoose.Schema({
    name :
    {
        type : String,
        required : true,
    },
    phone :
    {
        type : String,
        required : true,
    },
    email :
    {
        type : String,
        required : true,
    },
    address :
    {
        type : String,
        required : true,
    },
    avatar : 
    {
        type : String,
        required : true,
        default : 'uploads/avatar_1587657175473.png'
    },
    jobName : 
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'jposName',
        required : true,
        
    },
    responsibility : 
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'responsibility'
    } 
}));
//debended documention
const Employs2 = mongoose.model('employs2', new mongoose.Schema({
    name :
    {
        type : String,
        required : true,
    },
    phone :
    {
        type : String,
        required : true,
    },
    email :
    {
        type : String,
        required : true,
    },
    address :
    {
        type : String,
        required : true,
    },
    avatar : 
    {
        type : String,
        required : true,
        default : 'uploads/avatar_1587657175473.png'
    },
    jobName : jopsScemha,
    responsibility : responsibilityScemha,

}));

async function valiateUser(user) {
    const schema = await
        {
            name: joi.string().min(8).max(315).required(),
            email: joi.string().min(8).max(315).required(),
            phone: joi.string().min(8).max(100).required(),
            password: joi.string().min(8).max(315).required(),
            actvition: joi.boolean()
        }
    return joi.validate(user, schema)
}
async function valiateimg(img) {
    const schema = await
        {
            avatar: joi.string().required(),
        }
    return joi.validate(img, schema)
}
exports.User = User;
exports.Imgs = Imgs;
exports.Employs = Employs,
exports.responsibility = responsibility,
exports.JobsName = JobsName,
exports.Employs2 = Employs2,
exports.valiate = valiateUser;
exports.valiateimg = valiateimg;