const User = require("../../models/user");
const Event = require("../../models/event");
const {transformEvent } = require( "./merge.js");


module.exports = {
  events: async () => {
    try {
            const events = await Event.find()
                .populate("creator");
            return events.map((event) => {
                return transformEvent(event);
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
  },
    createEvent: async (args,req) => {
        if (!req.isAuth) { 
            throw new Error("Unauthenticated");
        }
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: req.userId,
    });
    let createdEvent;
    try {
          const result_1 = await event
              .save();
          createdEvent = transformEvent(result_1);
          const findUser = await User.findById(req.userId);
          if (!findUser) {
            throw new Error("User not found");
          }
          findUser.createdEvents.push(event);
          await findUser.save();
          return createdEvent;
      } catch (err) {
          console.log(err);
          throw err;
      }
  },

};