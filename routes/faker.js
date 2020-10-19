var express = require('express');
var router = express.Router();
var { User } = require('../models/users');
var faker = require('faker')
/* GET users listing. */
router.get('/',  (req, res, next) => {
    for (let index = 0; index < 200; index++) {
        const user = new User();
        user.name = faker.name.findName();
        user.email = faker.internet.email();
        user.phone = faker.phone.phoneNumber();
        user.actvition = faker.random.boolean();
        user.password = faker.internet.password();
        user.avatar = faker.internet.avatar();
        user.save((err)=>{
            if(err) throw err
        });
    }
  res.redirect('/api/user')
});
module.exports = router;
