"use strict";
const axios = use("axios");

class AuthController {
  async register({ request, response, session }) {
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
        session.put("token", resp.data.token);
        return response.status(201).json(data);
      })
      .catch(function (error) {
        return response
          .status(500)
          .json({ message: "Error to create the user", error });
      });
  }

  async login({ request, response, session }) {
    const url = process.env.API_AUTH + "/auth/login";
    const { email, password } = request.all();
    await axios
      .post(url, {
        email,
        password,
      })
      .then(function (resp) {
        const data = resp.data;
        session.put("token", resp.data.token);
        return response.status(201).json(data);
      })
      .catch(function (error) {
        return response
          .status(403)
          .json({ message: "Invalid email or password ", error });
      });
  }

  async logout({ response, session }) {
    const url = process.env.API_AUTH + "/auth/logout";
    const token = session.get("token").token;
    await axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then(function (resp) {
        const data = resp.data;
        session.forget("token");
        return response.status(201).json(data);
      })
      .catch(function (error) {
        return response
          .status(error.status)
          .json({
            message: "User already logged off or not authenticated",
            error,
          });
      });
  }
}

module.exports = AuthController;
