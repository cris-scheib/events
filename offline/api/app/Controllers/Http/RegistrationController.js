"use strict";

const Event = use("App/Models/Event");
const User = use("App/Models/User");
const EventUser = use("App/Models/EventsUser");
const moment = use("moment");

class RegistrationController {
    async checkIn({ response, params, request }) {
    try {
      const { user_id } = request.all();
      const event = await Event.query().where("slug", params.slug).first();
      const user = await User.find(user_id);
      let eventUser = await EventUser.query()
        .where("user_id", user_id)
        .where("event_id", event.id)
        .first();
      if (eventUser === null) {
        eventUser = await EventUser.create({
          user_id: user.id,
          event_id: event.id,
          dateTimeRegistration: null,
          dateTimeEntrance: moment().format(),
        });
      } else {
        if (eventUser.dateTimeEntrance === null) {
          eventUser.dateTimeEntrance = moment().format();
          eventUser.save();
        }
      }
      return response
        .status(200)
        .json({ message: "Entry registered with success" });
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Error while registering", error });
    }
  }
  async verifyRegistered({ response, params, auth }) {
    try {
      const event = await Event.query().where("slug", params.slug).first();
      const user = await auth.getUser();
      const eventUser = await EventUser.query()
        .where("user_id", user.id)
        .where("event_id", event.id)
        .count();
      return response.status(200).json(eventUser);
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Error to get the event", error });
    }
  }
}

module.exports = RegistrationController;