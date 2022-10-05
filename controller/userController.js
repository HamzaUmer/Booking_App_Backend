const Users = require('../models/Users');

//UPDATE
const updateUsers = async (req,res,next) => {
    try {
        const updateUsers = await Users.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body}, 
            {new:true}
        );
        res.status(200).json(updateUsers);
    } catch (error) {
        next(error);
    }
}

//DELETE
const deleteUsers = async (req,res,next) => {
    try {
        await Users.findByIdAndDelete(req.params.id, );
       res.status(200).json("Users has been deleted!!");
   } catch (error) {
       next(error);
   }
}

//READ
 const readUsers = async (req,res,next) => {
    try {
        const readUsers = await Users.findById(req.params.id);
        res.status(200).json(readUsers);
    } catch (error) {
       next(error);
   }
}

//READ ALL
 const readAllUsers = async (req,res,next) => {
    try {
        const readAllUsers = await Users.find(req.params.id);
        res.status(200).json(readAllUsers);
    }  catch (error) {
       next(error);
   }
}

module.exports = { readUsers, readAllUsers, updateUsers, deleteUsers};