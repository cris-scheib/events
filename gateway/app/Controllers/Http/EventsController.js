"use strict";
const axios = use("axios");
const logger = use("App/Helpers/Logger");

class EventsController {
  async getEvents({ response, request }) {
    const url = process.env.API_EVENTS + "/events";
    await logger("info", "[GET]:" + url, null, null);
    await axios
      .get(url, { headers: { Authorization: request.header("authorization") } })
      .then(function (resp) {
        const data = resp.data;
        return response.status(200).json(data);
      })
      .catch(function (error) {
        await logger("error", "[GET]:" + url, null, error);
        return response.status(500).json({
          message: "Error to get the events",
          error,
        });
      });
  }

  async getEvent({ response, params, request }) {
    const url = process.env.API_EVENTS + "/events/" + params.slug;
    await logger("info", "[GET]:" + url, null, null);
    await axios
      .get(url, { headers: { Authorization: request.header("authorization") } })
      .then(function (resp) {
        const data = resp.data;
        return response.status(200).json(data);
      })
      .catch(function (error) {
        await logger("error", "[GET]:" + url, null, error);
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
    await logger("info", "[GET]:" + url, null, null);
    await axios
      .get(url, { headers: { Authorization: request.header("authorization") } })
      .then(function (resp) {
        const data = resp.data;
        return response.status(200).json(data);
      })
      .catch(function (error) {
        await logger("error", "[GET]:" + url, null, error);
        return response.status(500).json({
          message: "Error to get the registration",
          error,
        });
      });
  }
}

module.exports = EventsController;
