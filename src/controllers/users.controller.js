const userCtrl = {};
const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const User = require('../models/User');

userCtrl.getUsers = async (req, res) => {
    try {
        const pass = crypto.createHmac('sha256', req.body.password)
        .update('I love cupcakes')
        .digest('hex');
        var login = await User.find({email:req.body.email, password: pass}).exec();
         if (login.length>0) {
             const user = {id:login[0]._id}
             const token = jwt.sign({user}, login[0].email ,{ expiresIn: '1h' })
            res.json({login,token}); 
        }else{ 
            res.json(false);
        }
    }
    catch (err) {
        res.status(400).json({
            error: err
        });
    }
};

userCtrl.createUser = async (req, res) => {
    try {
       
        const email = await User.find({email:req.body.email}).exec();
         if (email.length>0) {
            res.json(false); 
        }else{ 
            req.body.password = crypto.createHmac('sha256', req.body.password)
                                        .update('I love cupcakes')
                                        .digest('hex');
            const { username, email, password } = req.body;
            const newUser = new User({ username, email, password });
            await newUser.save();
            res.json(true);
        }
       
    } catch (e) {
        console.log(e)
        res.json(e.errmsg);
    }
};

userCtrl.deleteUser = async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json('User deleted');
}

module.exports = userCtrl;