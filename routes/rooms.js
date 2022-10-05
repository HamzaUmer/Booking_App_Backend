const express = require('express');
const { createRoom, updateRoom, deleteRoom, readRoom, readAllRoom, updateRoomAvail } = require('../controller/roomController');
const { verifyAdmin } = require('../utils/verifyToken');

const router = express.Router();

//CREATE
router.post("/:hotelid", verifyAdmin,createRoom);

//UPDATE
router.put("/:id", verifyAdmin,updateRoom);

//UPDATE ROOM AVAILABILITY
router.put("/availability/:id",updateRoomAvail);

//DELETE
router.delete("/:id/:hotelid", verifyAdmin ,deleteRoom);

//READ
router.get("/find/:id", readRoom);

//READ ALL
router.get("/", readAllRoom);

module.exports = router;