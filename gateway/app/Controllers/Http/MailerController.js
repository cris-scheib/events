"use strict";
const axios = use("axios");

class MailerController {
  async login({ response, request }) {
    const { user_id } = request.all();
    const url = process.env.API_MAILER + "/mailer/login";
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
        return response.status(500).json({
          message: "Error sending the e-mail",
          error,
        });
      });
  }
  async confirmRegister({ request, response, params }) {
    const url = process.env.API_MAILER + "/mailer/confirm-register/" + params.slug;
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
        return response
          .status(500)
          .json({ message: "Error sending the e-mail", error });
      });
  }
  async confirmEntry({ request, response, params }) {
    const { user_id } = request.all();
    const url = process.env.API_MAILER + "/mailer/confirm-entry/" + params.slug;
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
        return response
          .status(500)
          .json({ message: "Error sending the e-mail", error });
      });
  }
}

module.exports = MailerController;
