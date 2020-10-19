var express = require('express');
var router = express.Router();
var { User, valiate } = require('../models/users');
router.get('/', async (req, res) => {
    let name1 = req.query.search
    console.log(name1);
    const user = await User.find({ name: new RegExp('.*' + name1 + '.*', 'i') })
    console.log(user);
    if (!user) return res.status(404).send("The User Can't Found Can You trying again")
    res.send({ users:user });
})

module.exports = router;
