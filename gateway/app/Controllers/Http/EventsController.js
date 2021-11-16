"use strict";
const axios = use("axios");
const logger = use("App/Helpers/Logger");

class EventsController {
  async events({ response, request }) {
    const url = process.env.API_EVENTS + "/events";
    await logger("info", `[GET]${url}`, null, null);
    try {
      await axios
        .get(url, {
          headers: { Authorization: request.header("authorization") },
        })
        .then(function (resp) {
          const data = resp.data;
          return response.status(200).json(data);
        });
    } catch (error) {
      await logger("error", `[GET]${url}`, null, error);
      return response.status(500).json({
        message: "Error to get the events",
        error,
      });
    }
  }

  async event({ response, params, request }) {
    const url = process.env.API_EVENTS + "/events/" + params.slug;
    await logger("info", `[GET]${url}`, null, null);
    try {
      await axios
        .get(url, {
          headers: { Authorization: request.header("authorization") },
        })
        .then(function (resp) {
          const data = resp.data;
          return response.status(200).json(data);
        });
    } catch (error) {
      await logger("error", `[GET]${url}`, null, error);
      return response.status(500).json({
        message: "Error to get the event",
        error,
      });
    }
  }

  async myEvents({ response, request }) {
    const url = process.env.API_EVENTS + "/events/my-events";
    await logger("info", `[GET]${url}`, null, null);
    try {
      await axios
        .get(url, {
          headers: { Authorization: request.header("authorization") },
        })
        .then(function (resp) {
          console.log(resp)
          const data = resp.data;
          return response.status(200).json(data);
        });
    } catch (error) {
      await logger("error", `[GET]${url}`, null, error);
      return response.status(500).json({
        message: "Error to get the events",
        error,
      });
    }
  }

  async myCertificates({ response, request }) {
    const url = process.env.API_EVENTS + "/events/my-certificates";
    await logger("info", `[GET]${url}`, null, null);
    try {
      await axios
        .get(url, {
          headers: { Authorization: request.header("authorization") },
        })
        .then(function (resp) {
          const data = resp.data;
          return response.status(200).json(data);
        });
    } catch (error) {
      await logger("error", `[GET]${url}`, null, error);
      return response.status(500).json({
        message: "Error to get the events",
        error,
      });
    }
  }
}

module.exports = EventsController;
