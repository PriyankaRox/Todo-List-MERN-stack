const { user } = require('../models/user.models');
const bcrypt = require("bcrypt");
const secret_key = "a02951uyehdthsd7836nncqQQ9id6tebd" ;
const saltRounds = 15;
const jwt = require("jsonwebtoken");

//create user
module.exports.createUserController = async (req, res) => {
    try {
      const { name, email, password, confirmPassword } = req.body;
      const userExists = await user.findOne({ email: email });
      if (userExists) {
        return res.json({ message: "User already exists with this Emailid" });
      } else {
        const encrypted_password = await bcrypt.hash(password, saltRounds);
        const encrypted_confirmPassword = await bcrypt.hash(confirmPassword, saltRounds);
        const newData = new user({
          name,
          email,
          password: encrypted_password,
          confirmPassword: confirmPassword
        });
        const savedData = await newData.save();
        if (!savedData) {
          res.status(400).json({ error: "user not saved" });
        } else {
          const returnData = JSON.parse(JSON.stringify(savedData));
          returnData.id = returnData._id;
          delete returnData._id;
          delete returnData.__v;
          delete returnData.password;
          res.json({
            message: "New user added successfuly",
            user: returnData,
          });
        }
      }
    } catch (err) {
      console.log(err);
      res.status(400).send({ err: "server error" });
    }
  };


//create login 
module.exports.loginController = async(req,res)=>{
    try {
        const { email, password } = req.body;
        const userExists = await user.findOne({ email: email });
        if (!userExists) {
          res.status(400).json({ error: "User does not exists" });
        } else {
          const dbUserData = JSON.parse(JSON.stringify(userExists));
          passwordStatus = await bcrypt.compare(password, dbUserData.password);
          if (passwordStatus) {
            dbUserData.id = dbUserData._id;
            delete dbUserData._id;
            delete dbUserData.__v;
            delete dbUserData.password;
            const token = jwt.sign(dbUserData, secret_key);
            res.json({
              message: "User login successful",
              token: token,
              user: dbUserData,
            });
          } else {
            res.json({ message: "Invalid email or passsword" });
          }
        }
      } catch (err) {
        console.log(err);
        res.status(400).send({ err: "server error" });
      }
}
