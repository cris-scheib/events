"use strict";
const axios = use("axios");

class AuthController {
  async register({ request, response }) {
    const url = process.env.API_AUTH + "/auth/register";
    const { email, password, name, document } = request.all();
    await axios
      .post(url, {
        email,
        password,
        name,
        document,
      })
      .then(function (resp) {
        const data = resp.data;
        return response.status(201).json(data);
      })
      .catch(function (error) {
        return response
          .status(500)
          .json({ message: "Error to create the user", error });
      });
  }

  async login({ request, response }) {
    const url = process.env.API_AUTH + "/auth/login";
    const { email, password } = request.all();
    await axios
      .post(url, {
        email,
        password,
      })
      .then(function (resp) {
        const data = resp.data;
        return response.status(201).json(data);
      })
      .catch(function (error) {
        return response
          .status(403)
          .json({ message: "Invalid email or password ", error });
      });
  }

  async logout({ response, request }) {
    const url = process.env.API_AUTH + "/auth/logout";
    await axios
      .get(url, { headers: { Authorization: request.header("authorization") } })
      .then(function (resp) {
        const data = resp.data;
        return response.status(201).json(data);
      })
      .catch(function (error) {
        return response
          .status(403)
          .json({ message: "Authenticated user not found" });
      });
  }
  async logout({ response, request }) {
    const url = process.env.API_AUTH + "/auth/get-token";
    await axios
      .get(url)
      .then(function (resp) {
        const data = resp.data;
        return response.status(200).json(data);
      })
      .catch(function (error) {
        return response
          .status(500)
          .json({ message: "Error to get the Token" });
      });
  }
}

module.exports = AuthController;
