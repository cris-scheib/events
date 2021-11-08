"use strict";
const axios = use("axios");

class EventsController {
  async getEvents({ response, request }) {
    const url = process.env.API_EVENTS + "/events";
    await axios
      .get(url)
      .then(function (resp) {
        const data = resp.data;
        return response.status(200).json(data);
      })
      .catch(function (error) {
        return response.status(error.status).json({
          message: "User already logged off or not authenticated",
          error,
        });
      });
  }

  async getEvent({ response, params }) {
    const url = process.env.API_EVENTS + "/events/" + params.slug;
    await axios
      .get(url)
      .then(function (resp) {
        const data = resp.data;
        return response.status(200).json(data);
      })
      .catch(function (error) {
        return response.status(error.status).json({
          message: "User already logged off or not authenticated",
          error,
        });
      });
  }
}

module.exports = EventsController;
