const express = require('express');
const { updateUsers, deleteUsers, readUsers, readAllUsers } = require('../controller/userController');
const {verifyUser, verifyAdmin} = require('../utils/verifyToken');

const router = express.Router();

//UPDATE
router.put("/:id",verifyUser, updateUsers);

//DELETE
router.delete("/:id",verifyUser, deleteUsers);

//READ
router.get("/:id", verifyUser, readUsers);

//READ ALL
router.get("/",verifyAdmin, readAllUsers);

module.exports = router;