"use strict";

const Hash = use("Hash");
const User = use("App/Models/User");
const moment = use("moment");
const btoa = require('btoa');

class UserController {
  async verifyUser({ request, response }) {
    try {
      const { document } = request.all();
      const user = await User.query().where("document", document).first();
      return response.status(200).json({ user });
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Error to find the user", error });
    }
  }
  async newUser({ request, response }) {
    try {
      const { email, name, document } = request.all();
      const hash =  btoa(document + " " + moment().format())
      const user = await User.create({
        email,
        name,
        document,
        hash,
      });
      if (user) {
        return response
          .status(201)
          .json({ message: "User to create with success", user });
      } else {
        return response
          .status(500)
          .json({ message: "Error to create the user" });
      }
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Error to create the user", error });
    }
  }
}

module.exports = UserController;
