"use strict";
const axios = use("axios");
const logger = use("App/Helpers/Logger");

class MailerController {
  async login({ response, request }) {
    const { user_id } = request.all();
    const url = process.env.API_MAILER + "/mailer/login";
    await logger("info", "[POST]:" + url, null, null);
    await axios
      .post(url, {
        user_id,
      })
      .then(function () {
        return response
          .status(200)
          .json({ message: "Email successfully sent" });
      })
      .catch(function (error) {
        await logger("error", "[POST]:" + url, null, error);
        return response.status(500).json({
          message: "Error sending the e-mail",
          error,
        });
      });
  }
  async confirmRegister({ request, response, params }) {
    const url =
      process.env.API_MAILER + "/mailer/confirm-register/" + params.slug;
    await logger("info", "[GET]:" + url, null, null);
    await axios
      .get(url, {
        headers: { Authorization: request.header("authorization") },
      })
      .then(function () {
        return response
          .status(200)
          .json({ message: "Email successfully sent" });
      })
      .catch(function (error) {
        await logger("error", "[GET]:" + url, null, error);
        return response
          .status(500)
          .json({ message: "Error sending the e-mail", error });
      });
  }
  async confirmEntry({ request, response, params }) {
    const { user_id } = request.all();
    const url = process.env.API_MAILER + "/mailer/confirm-entry/" + params.slug;
    await logger("info", "[POST]:" + url, null, null);
    await axios
      .post(
        url,
        {
          user_id,
        },
        {
          headers: { Authorization: request.header("authorization") },
        }
      )
      .then(function () {
        return response
          .status(200)
          .json({ message: "Email successfully sent" });
      })
      .catch(function (error) {
        await logger("error", "[POST]:" + url, null, error);
        return response
          .status(500)
          .json({ message: "Error sending the e-mail", error });
      });
  }
}

module.exports = MailerController;
