"use strict";
const axios = use("axios");
const logger = use("App/Helpers/Logger");

class AuthController {
  async register({ request, response }) {
    const url = process.env.API_AUTH + "/auth/register";
    const { email, password, name, document } = request.all();
    await logger("info", `[POST]${url}`, null, null);
    try {
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
        });
    } catch (error) {
      await logger("error", `[POST]${url}`, null, error);
      return response
        .status(500)
        .json({ message: "Error to create the user", error });
    }
  }

  async login({ request, response }) {
    const url = process.env.API_AUTH + "/auth/login";
    const { email, password } = request.all();
    await logger("info", `[POST]${url}`, null, null);
    try {
      await axios
        .post(url, {
          email,
          password,
        })
        .then(function (resp) {
          const data = resp.data;
          return response.status(201).json(data);
        });
    } catch (error) {
      await logger("error", `[POST]${url}`, null, error);
      return response
        .status(403)
        .json({ message: "Invalid email or password ", error });
    }
  }
  async createPassword({ request, response }) {
    const url = process.env.API_AUTH + "/auth/create-password";
    const { password, hash } = request.all();
    await logger("info", `[POST]${url}`, null, null);
    try {
      await axios
        .post(url, {
          password,
          hash,
        })
        .then(function (resp) {
          const data = resp.data;
          return response.status(201).json(data);
        });
    } catch (error) {
      await logger("error", `[POST]${url}`, null, error);
      return response.status(403).json({ message: "Invalid token", error });
    }
  }

  async logout({ response, request }) {
    const url = process.env.API_AUTH + "/auth/logout";
    await logger("info", `[GET]${url}`, null, null);
    try {
      await axios
        .get(url, {
          headers: { Authorization: request.header("authorization") },
        })
        .then(function (resp) {
          const data = resp.data;
          return response.status(201).json(data);
        });
    } catch (error) {
      await logger("error", `[GET]${url}`, null, error);
      return response
        .status(403)
        .json({ message: "Authenticated user not found" });
    }
  }
  async getToken({ response, request }) {
    const url = process.env.API_AUTH + "/auth/get-token";
    await logger("info", `[GET]: ${url}`, null, null);
    try {
      await axios.get(url).then(function (resp) {
        const data = resp.data;
        return response.status(200).json(data);
      });
    } catch (error) {
      await logger("error", `[GET]${url}`, null, error);
      return response.status(500).json({ message: "Error to get the Token" });
    }
  }
}

module.exports = AuthController;
