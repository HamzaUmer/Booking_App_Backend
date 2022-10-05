const express = require('express');
const { createHotel, updateHotel, deleteHotel, readHotel, readAllHotel, countByCity, countByType, readHotelRooms } = require('../controller/hotelController');
const { verifyAdmin } = require('../utils/verifyToken');

const router = express.Router();

//CREATE
router.post("/", verifyAdmin,createHotel);

//UPDATE
router.put("/:id", verifyAdmin,updateHotel);

//DELETE
router.delete("/find/:id", verifyAdmin ,deleteHotel);

//READ
router.get("/find/:id", readHotel);

//READ ALL
router.get("/", readAllHotel);

//Count cities by queries
router.get("/countByCity",countByCity);

//Count type by queries
router.get("/countByType", countByType);

//Room fetching API
router.get("/room/:id", readHotelRooms);


module.exports = router;