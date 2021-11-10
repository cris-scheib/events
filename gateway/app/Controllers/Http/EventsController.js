"use strict";
const axios = use("axios");

class EventsController {
  async getEvents({ response, request }) {
    const url = process.env.API_EVENTS + "/events";
    await axios
      .get(url, { headers: { Authorization: request.header("authorization") } })
      .then(function (resp) {
        const data = resp.data;
        return response.status(200).json(data);
      })
      .catch(function (error) {
        return response.status(500).json({
          message: "Error to get the events",
          error,
        });
      });
  }

  async getEvent({ response, params, request }) {
    const url = process.env.API_EVENTS + "/events/" + params.slug;
    await axios
      .get(url, { headers: { Authorization: request.header("authorization") } })
      .then(function (resp) {
        const data = resp.data;
        return response.status(200).json(data);
      })
      .catch(function (error) {
        return response.status(500).json({
          message: "Error to get the event",
          error,
        });
      });
  }

  async verifyRegistration({ response, request }) {
    const url =
      process.env.API_EVENTS +
      "/events/" +
      params.slug +
      "/verify-registration";
    await axios
      .get(url, { headers: { Authorization: request.header("authorization") } })
      .then(function (resp) {
        const data = resp.data;
        return response.status(200).json(data);
      })
      .catch(function (error) {
        return response.status(500).json({
          message: "Error to get the registration",
          error,
        });
      });
  }
}

module.exports = EventsController;
