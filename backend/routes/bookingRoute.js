const authMiddleware = require("../middleware/authMiddleware");
const Booking = require("../models/bookingModel");
const Show = require("../models/showModel");


const router = require("express").Router();
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51LCQ2CSJ2bcgnaheeChQ6HDWz2cQAJ4YHmcIDD0F6CxaUS71myA6IIeQa6e8CdTrHvgvo5xkkccF30S3Z1TTUiaQ00rVxs2eGR');


router.post("/make-payment", authMiddleware,async (req, res) => {
    try {
      const { token, amount } = req.body;      
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'inr',
});
     
      res.send({
        success: true,
        message: "Payment successful",
       secret: paymentIntent.client_secret
    //     data: transactionId,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  });

  //book shows

  router.post("/book-show", authMiddleware, async (req, res) => {
    try {
      const newBooking = new Booking(req.body);
      await newBooking.save();

  
      const show = await Show.findById(req.body.show);
      // update seats
      await Show.findByIdAndUpdate(req.body.show, {
        bookedSeats: [...show.bookedSeats, ...req.body.seats],
      });
  
      res.send({
        success: true,
        message: "Show booked successfully",
        data: newBooking,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  });


  router.get("/get-bookings", authMiddleware, async (req, res) => {
    try {

      const bookings = await Booking.find({ user: req.body.userId })
        .populate("show")
        .populate({
          path: "show",
          populate: {
            path: "movie",
            model: "movies",
          },
        })
        .populate("user")
        .populate({
          path: "show",
          populate: {
            path: "theatre",
            model: "theatres",
          },
        });
  
      res.send({
        success: true,
        message: "Bookings fetched successfully",
        data: bookings,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  });



  module.exports = router;
