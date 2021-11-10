"use strict";

const axios = use("axios");

class RegistrationController {
  async register({ response, params, request }) {
    const url = process.env.API_REGIST + "/registration/" + params.slug;
    await axios
      .get(url, { headers: { Authorization: request.header("authorization") } })
      .then(function (resp) {
        const data = resp.data;
        return response.status(200).json(data);
      })
      .catch(function (error) {
        return response.status(500).json({
          message: "Error while registering",
          error,
        });
      });
  }
  async cancel({ response, params, request }) {
    const url = process.env.API_REGIST + "/registration/" + params.slug;
    await axios
      .delete(url, { headers: { Authorization: request.header("authorization") } })
      .then(function (resp) {
        const data = resp.data;
        return response.status(200).json(data);
      })
      .catch(function (error) {
        return response.status(500).json({
          message: "Error while canceling the registration",
          error,
        });
      });
  }
  async checkIn({ response, params, request }) {
    const { user_id } = request.all();
    const url = process.env.API_REGIST + "/registration/" + params.slug;
    await axios
      .post(
        url,
        { user_id },
        {
          headers: { Authorization: request.header("authorization") },
        }
      )
      .then(function (resp) {
        const data = resp.data;
        return response.status(200).json(data);
      })
      .catch(function (error) {
        return response.status(500).json({
          message: "Error while registering",
          error,
        });
      });
  }
  async verifyRegistered({ response, params, request }) {
    const url = process.env.API_REGIST + "/registration/" + params.slug+ "/verify-registered";
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

module.exports = RegistrationController;
