"use strict";

const Event = use("App/Models/Event");
const User = use("App/Models/User");
const EventUser = use("App/Models/EventsUser");
const moment = use("moment");
const Database = use("Database");

class SynchronizationController {
  async sync({ response }) {
    if (this.verifyConnection()) {
      let newUser = null;
      let newUserOnline = null;
      const transition = await Database.beginTransaction();
      try {
        const users = await User.all();
        for (let user of users.rows) {
          let exists = await Database.connection("online")
            .table("users")
            .where("document", user.document)
            .count();
          if (exists[0].count == 0) {
            newUser = await Database.connection("online")
              .table("users")
              .returning("id")
              .insert({
                name: user.name,
                document: user.document,
                email: user.email,
                password: user.password,
                hash: user.hash,
                is_admin: user.is_admin,
              });
          }
          const eventsUser = await EventUser.query()
            .where("user_id", user.id)
            .fetch();
          for (let eventUser of eventsUser.rows) {
            let exists = await Database.connection("online")
              .table("events_users")
              .where("user_id", eventUser.user_id)
              .where("event_id", eventUser.event_id)
              .count();
            if (exists[0].count == 0) {
              if (newUser !== null) {
                await Database.connection("online")
                  .table("events_users")
                  .insert({
                    user_id: newUser[0],
                    event_id: eventUser.event_id,
                  });
              } else {
                await Database.connection("online")
                  .table("events_users")
                  .insert({
                    user_id: eventUser.user_id,
                    event_id: eventUser.event_id,
                  });
              }
            }
          }
        }
        const onlineUsers = await Database.connection("online")
          .select("*")
          .from("users");
        for (let onlineUser of onlineUsers) {
          let exists = await User.query()
            .where("document", onlineUser.document)
            .count();
          if (exists[0].count == 0) {
            newUserOnline = await User.create({
              name: onlineUser.name,
              document: onlineUser.document,
              email: onlineUser.email,
              password: onlineUser.password,
              hash: onlineUser.hash,
              is_admin: onlineUser.is_admin,
            });
          }
          const onlineEventsUser = await Database.connection("online")
            .select("*")
            .where("user_id", onlineUser.id)
            .from("events_users");
          for (let eventUserOnline of onlineEventsUser) {
            let exists = await EventUser.query()
              .where("user_id", eventUserOnline.user_id)
              .where("event_id", eventUserOnline.event_id)
              .count();
            if (exists[0].count == 0) {
              if (newUserOnline !== null) {
                await EventUser.create({
                  user_id: newUserOnline.id,
                  event_id: eventUserOnline.event_id,
                });
              } else {
                await EventUser.create({
                  user_id: eventUserOnline.user_id,
                  event_id: eventUserOnline.event_id,
                });
              }
            }
          }
        }
        await transition.commit();
        Database.close(["online"]);
        return response
          .status(200)
          .json({ message: "Data successfully synchronized" });
      } catch (error) {
        await transition.rollback();
        return response
          .status(500)
          .json({ message: "Error while synchronizing the users", error });
      }
    } else {
      return response.status(500).json({
        message: "The server is not reachable at the moment, try again later",
      });
    }
  }

  async verifyConnection() {
    try {
      const events = await Database.connection("online")
        .table("events")
        .select("id")
        .first();
      Database.close(["online"]);
      return events !== null;
    } catch (error) {
      return false;
    }
  }
}

module.exports = SynchronizationController;
