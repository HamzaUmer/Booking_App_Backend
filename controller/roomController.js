const Room = require('../models/Rooms');
const Hotel = require('../models/Hotels');

//CREATE
const createRoom = async (req,res,next) => {
    const hotelid = req.params.hotelid;
    const newRoom = new Room(req.body);
    try {
        const savedRoom = await newRoom.save();
        try {
           await Hotel.findByIdAndUpdate(hotelid, {
            $push : {rooms: savedRoom._id},
           });
        } catch (error) {
            next(error);
        }

        res.status(200).json(savedRoom);
    } catch (error) {
        next(error);
    }
};

//UPDATE
const updateRoom = async (req,res,next) => {
    try {
        const updateRoom = await Room.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body}, 
            {new:true}
        );
        res.status(200).json(updateRoom);
    } catch (error) {
        next(error);
    }
}

//DELETE
const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    try {
      await Room.findByIdAndDelete(req.params.id);
      try {
        await Hotel.findByIdAndUpdate(hotelId, {
          $pull: { rooms: req.params.id },
        });
      } catch (err) {
        next(err);
      }
      res.status(200).json("Room has been deleted.");
    } catch (err) {
      next(err);
    }
  };

//READ
 const readRoom = async (req,res,next) => {
    try {
        const readRoom = await Room.findById(req.params.id);
        res.status(200).json(readRoom);
    } catch (error) {
       next(error);
   }
}

//READ ALL
 const readAllRoom = async (req,res,next) => {
    try {
        const readAllRoom = await Room.find(req.params.id);
        res.status(200).json(readAllRoom);
    }  catch (error) {
       next(error);
   }
}

//UPDATE ROOM AVAILABILITY
const updateRoomAvail = async (req,res,next) => {
  try {
      await Room.updateOne({"roomNumbers._id": req.params.id},
      {
        $push: {
          "roomNumbers.$.unavailableDates":req.body.dates
        },
      })
      res.status(200).json("Room status has been updated.");
  } catch (error) {
      next(error);
  }
}

module.exports = {createRoom, updateRoom, deleteRoom, readRoom, readAllRoom, updateRoomAvail};