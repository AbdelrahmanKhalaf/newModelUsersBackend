
var express = require('express');
var router = express.Router();
var { User, valiate , Imgs ,valiateimg ,responsibility , Employs , JobsName ,Employs2} = require('../models/users');
var multer = require('multer');
var storage = multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,'uploads')
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname + '_' + Date.now() + '.png')
    }
})
const fileFilter =  function fileFilter(req , file , cb){
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true)
    }else{
        cb(null,false)
    }
}
var upload = multer({
    storage:storage,

    fileFilter: fileFilter
})
/* GET users listing. */

router.get('/', async (req, res, next) => {
    const users = await User.find().sort('name');
    return res.json({ users: users });
});
router.get('/:id', async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("The User Can't Found Can You trying again")
    return res.json({ user: user });
});

router.post('/' , async (req, res, next) => {
    const user = new User
        (
            {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password,
            }
        )
    try {
        const resullt = await user
            .save()
        const { error } = await valiate(req.body);
        if (error) return res.status(400).send(error.details[0].message)
        console.log(resullt);
    }
    catch (ex) {
        for (index in ex.errors) {
            console.log(ex.errors[index].message);
        }
    }

});
router.post('/imgs', upload.single('avatar') ,  function(req,res){
    const imgs = new Imgs({
        avatar : req.file.path
    })
    
  console.log(req.file);
  
    
})
router.post('/jopsname',function(req,res){
    const jopsname = new JobsName({
        name_job: req.body.name_job
    })
    jopsname.save()
    console.log(req.body);
    
});
router.post('/responsibility',function(req,res){
    const responsibilitys = new responsibility({
        name_admin: req.body.name_admin
    })
    responsibilitys.save()
    console.log(req.body);
    
}),
router.post('/employ',function(req,res){
    const employ = new Employs({
        name: req.body.name,
        phone:req.body.phone,
        email:req.body.email,
        address:req.body.address,
        avatar:req.body.avatar,
        jobName:req.body.jobName,
        responsibility:req.body.responsibility,
    })
    employ.save()
    console.log(req.body);
    
}),
router.post('/employ2',function(req,res){
    const employ2 = new Employs2({
        name: req.body.name,
        phone:req.body.phone,
        email:req.body.email,
        address:req.body.address,
        avatar:req.body.avatar,
        jobName:req.body.jobName,
        responsibility:req.body.responsibility,
    })
    employ2.save()
    console.log(req.body);
    
}),
router.get('/imgs', async (req, res, next) => {
    const imgs = await imgs.find().sort('avatar');
    return res.json({ imgs: imgs });
});
router.put('/:id', async (req, res, next) => {

    const user = await User.findByIdAndUpdate(req.params.id);
    if (!user) return res.status(404).send("The User Can't Found Can You trying again")
    user.set({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
    })
    user.save((err) => {
        if (err) throw err
    })
    res.status(200).send({ user: user });
});
router.put('/imge/:id', upload.single('avatar'), async (req, res, next) => {
   
    const user = await User.findByIdAndUpdate(req.params.id);
    if (!user) return res.status(404).send("The User Can't Found Can You trying again")
    user.set({
        avatar: req.file.path,
    })
    console.log(req.file);
    
    user.save((err) => {
        if (err) throw err
    })
    res.status(200).send({ user: user });
});
router.delete('/:id', async (req, res, next) => {
    const user = await User.findByIdAndRemove(req.params.id)
    if (!user) return res.status(404).send("The User Can't Found Can You trying again")
    res.status(200).send({ user: user });
});


module.exports = router;
