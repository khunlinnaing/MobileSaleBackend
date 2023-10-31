const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
getAllUser = async (req, res, next) =>{
    let users;
    try{
        users = await User.find();
    }catch(error){
    console.log(error)
    }
    if(!users){
        return res.status(404).json({ message: "No Users Found"});
    }
    return res.status(200).json({ users })
}
UpdateUser = async (req, res, next) =>{
    const id = req.params.id;
    const updateData = req.body;
    const { firstName, lastName, email, phone, mobile, address, birthday, profile, gender } = req.body
    const exitingUser = await User.findById(id);
    if (!exitingUser) {
        return res.json({ error: 'This user  is not found', ststus: 0 });
    }
    const updateCategory = await User.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
    ).then( result => {
        return res.status(200).json({
            message: "update is success",
            status: 1,
            data: result
        });
    }).catch(err =>{
        return res.status(404).json({
            message: "SomeThing is error",
            status: 0
        })
    })
}
getByEamil = async (req, res, next) =>{
    const email= req.params.email
    try{
        const user = await User.findOne({email: email})
        const token = jwt.sign({userId: user.id, email: user.email}, "somesupersecretkey", {
            expiresIn : '1h'
        });
        return res.json({info: user, status: 1, token: token})
    }catch(err){
        return res.json({message: err.message, status: 0})
    }
}

singup = async (req, res, next) =>{
    const { firstName, lastName, email, phone, mobile, address, birthday, profile, role,password, confirmpassword, gender } = req.body
    try{
        const checkemail =await User.findOne({ email: email });
        if (checkemail) {
            return res.json({ message: email + " is already exit" , status: 0});
        }
        const checkephone =await User.findOne({ phone: phone });
        if (checkephone) {
            return res.json({ message: phone + " is already exit" , status: 0});
        }

        if (password != confirmpassword) {
            return res.json({ message: "Password and confirm Password is't match." , status: 0});
        } else {
            const hashedPassword = await bcrypt.hash(password, 12);
            const newuser = new User({
                firstName: firstName, lastName: lastName, email: email, phone: phone, mobile: mobile, address: address, birthday: birthday, profile: profile, role: role,password: hashedPassword, gender: gender
            });
            await newuser.save();
            const token = jwt.sign({email: email, password: hashedPassword}, "somesupersecretkey", {
                expiresIn : '1h'
            });
            return res.json({ message: "Create New User is Successfully!.", status: 1, token: token, value: newuser });
        }
    }catch(error){
        return res.json({ message: error.message , status: 0});
    }
}

login = async (req, res, next) =>{
    const { email, password } = req.body;
    const user =await User.findOne({ email: email});
    if(!user){
        return res.json({ message: "User Not Found.", status: 0});
    }else{
        const isEqual = await bcrypt.compare(password, user.password);
        if(!isEqual){
            return res.json({ message: "Password is invalid", status: 0});
        }
        const token = jwt.sign({userId: user.id, email: user.email}, "somesupersecretkey", {
            expiresIn : '1h'
        });
        const data ={
                "id": user._id,
                "firstname": user.firstname,
                "lastname": user.lastname,
                "email": user.email,
                "phone": user.phone,
                "birthday": user.birthday,
                "address": user.address,
                "profile": user.profile,
                "role": user.role,
                "token": token,
                "status": 1
            }
        return res.json(data)
    }
}
module.exports = {
    getAllUser,
    getByEamil,
    UpdateUser,
    singup,
    login
}