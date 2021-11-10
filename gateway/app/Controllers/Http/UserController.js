"use strict";
const axios = use("axios");

class UserController {
  async user({ response, request }) {
    const url = process.env.API_AUTH + "/user/";
    await axios
      .get(url, { headers: { Authorization: request.header("authorization") } })
      .then(function (resp) {
        const data = resp.data;
        return response.status(201).json(data);
      })
      .catch(function (error) {
        return response.status(error.status).json({
          message: "User logged off or not authenticated",
          error,
        });
      });
  }
  async password({ request, response }) {
    const { password, newPassword } = request.all();
    const url = process.env.API_AUTH + "/user/password";
    await axios
      .put(
        url,
        {
          password,
          newPassword,
        },
        {
          headers: { Authorization: request.header("authorization") },
        }
      )
      .then(function (resp) {
        return response.status(200).json({ message: "Password updated" });
      })
      .catch(function (error) {
        return response
          .status(500)
          .json({ message: "Error to update the password", error });
      });
  }
  async profile({ request, response }) {
    const { name, document } = request.all();
    const url = process.env.API_AUTH + "/user/profile";
    await axios
      .put(
        url,
        {
          name,
          document,
        },
        { 
          headers: { Authorization: request.header("authorization") } 
        }
      )
      .then(function (resp) {
        const data = resp.data;
        return response.status(200).json(data);
      })
      .catch(function (error) {
        return response
          .status(500)
          .json({ message: "Error to update the profile", error });
      });
  }
}

module.exports = UserController;
