"use strict";

const Event = use("App/Models/Event");

class EventsController {
  async events({ response }) {
    try {
      const events = await Event.all();
      return response.status(200).json(events);
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Error to get the events", error });
    }
  }
  async event({ response, params }) {
    try {
      const event = await Event.query().where("slug", params.slug).first();
      return response.status(200).json(event);
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Error to get the event", error });
    }
  }
  async myEvents({ response, auth }) {
    try {
      const user = await auth.getUser();
      const events = await Event.query()
        .whereHas("eventsUsers", (builder) => {
          builder.where("user_id", user.id);
        })
        .with("eventsUsers")
        .fetch();
      return response.status(200).json(events);
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Error to get the event", error });
    }
  }
  async myCertificates({ response, auth }) {
    try {
      const user = await auth.getUser();
      const events = await Event.query()
        .whereHas("eventsUsers", (builder) => {
          builder.where("user_id", user.id);
          builder.whereNotNull("dateTimeEntrance");
        })
        .with("eventsUsers")
        .fetch();
      return response.status(200).json(events);
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .json({ message: "Error to get the event", error });
    }
  }
}

module.exports = EventsController;
