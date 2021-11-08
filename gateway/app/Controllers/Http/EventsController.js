"use strict";
const axios = use("axios");

class EventsController {
  async getEvents({ response, request }) {
    const url = process.env.API_EVENTS + "/";
    await axios
      .get(url, { headers: { Authorization: request.header("authorization") } })
      .then(function (resp) {
        console.log(data);
        const data = resp.data;
        return response.status(201).json(data);
      })
      .catch(function (error) {
        return response.status(error.status).json({
          message: "User already logged off or not authenticated",
          error,
        });
      });
  }
  async getEvent({ response, params }) {
    const url = process.env.API_EVENTS + "/" + params.id;
    await axios
      .get(url, { headers: { Authorization: request.header("authorization") } })
      .then(function (resp) {
        const data = resp.data;
        return response.status(201).json(data);
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
