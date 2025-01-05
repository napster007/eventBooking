const Booking = require("../../models/booking");
const Event = require("../../models/event");
const { transformBooking,transformEvent} = require("./merge.js");


module.exports = {
     bookings: async () => { 
        try {
            const bookings = await Booking.find();
          return bookings.map((booking) => (
              transformBooking(booking)
            ));
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    
    bookEvent: async (args) => {
        try {
            const fetchedEvent = await Event.findById({ _id: args.eventId });
            if (!fetchedEvent) {
              throw new Error("Event not found");
            }
            const booking = new Booking({
              user: "67711ec8a3e2b5ec0c259b35",
              event: fetchedEvent,
            });
            const result = await booking.save();
            return transformBooking(result);
        } catch (err) {
            console.log(err);    
            throw err;
        }
    },

    cancelBooking: async args => { 
        try {
            const booking = await Booking.findById(args.bookingId).populate("event");
            const event = transformEvent(booking.event);
            if (!booking) {
                throw new Error("Booking not found");
            }
            await Booking.deleteOne({ _id: args.bookingId });
            return event;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
};