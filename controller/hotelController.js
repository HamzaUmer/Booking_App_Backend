const Hotel = require('../models/Hotels');
const Room = require('../models/Rooms');

//CREATE
 const createHotel = async (req,res,next) => {
    const newHotel = new Hotel(req.body);

    try {
        const saveHotel = await newHotel.save();
        res.status(200).json(saveHotel);
    } catch (error) {
        next(error);
    }
};

//UPDATE
const updateHotel = async (req,res,next) => {
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body}, 
            {new:true}
        );
        res.status(200).json(updateHotel);
    } catch (error) {
        next(error);
    }
}

//DELETE
const deleteHotel = async (req,res,next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id );
       res.status(200).json("Hotel has been deleted!!");
   } catch (error) {
       next(error);
   }
}

//READ
 const readHotel = async (req,res,next) => {
    try {
        const readHotel = await Hotel.findById(req.params.id);
        res.status(200).json(readHotel);
    } catch (error) {
       next(error);
   }
}

//READ ALL
 const readAllHotel = async (req,res,next) => {
    const {min, max, ...others} = req.query;
    try {
        const readAllHotel = await Hotel.find({...others, cheapestPrice: {$gt: min ||1 , $lt: max ||777},}).limit(req.query.limit);
        res.status(200).json(readAllHotel);
    }  catch (error) {
       next(error);
   }
}

//Count By city
const countByCity = async (req,res,next) => {
    const cities = req.query.cities.split(',');
    try {
        const list = await Promise.all(cities.map(city => {
             return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list);
    }  catch (error) {
       next(error);
   }
}

//Count By Type
const countByType = async (req,res,next) => {
    try {
        const hotelCount = await Hotel.countDocuments({type: 'Hotel'});
        const appartmentCount = await Hotel.countDocuments({type: 'Apartment'});
        const resortCount = await Hotel.countDocuments({type: 'Resort'});
        const villaCount = await Hotel.countDocuments({type: 'Villa'});
        const cabinCount = await Hotel.countDocuments({type: 'Cabin'});

        res.status(200).json([
            {type: "Hotel", count : hotelCount},
            {type: "Apartment", count : appartmentCount},
            {type: "Resort", count : resortCount},
            {type: "Villa", count : villaCount},
            {type: "Cabin", count : cabinCount},
        ]);
    }  catch (error) {
       next(error);
   }
}

//Room Fetching API
const readHotelRooms = async(req,res,next) => {
    try {
        const hotels = await Hotel.findById(req.params.id);
        const list = await Promise.all(hotels.rooms.map(room => {
            return Room.findById(room);
        }))

        res.status(200).json(list);
       
    } catch (error) {
        next(error);
    }
}

module.exports = {createHotel, readHotel, readAllHotel, updateHotel, deleteHotel, countByCity, countByType, readHotelRooms};