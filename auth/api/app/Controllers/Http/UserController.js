"use strict";

const Hash = use("Hash");
const User = use("App/Models/User");
const moment = use("moment");

class UserController {
  async user({ response, auth }) {
    try {
      const user = await auth.getUser();
      return response.status(200).json(user);
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Unauthenticated user ", error });
    }
  }
  async password({ request, response, auth }) {
    try {
      const { password, newPassword } = request.all();
      const user = await auth.getUser();
      const passwordValid = await Hash.verify(password, user.password);
      if (!passwordValid) {
        return response
          .status(400)
          .json({ message: "Passwords are not compatible" });
      }
      user.password = newPassword;
      const result = await user.save();
      if (result) {
        return response.status(200).json({ message: "Password updated" });
      }
      return response
        .status(500)
        .json({ message: "Error to update the password" });
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Error to update the password", error });
    }
  }
  async profile({ request, response, auth }) {
    try {
      const { name, document } = request.all();
      const user = await auth.getUser();
      user.name = name;
      user.document = document;
      const result = await user.save();
      if (result) {
        return response.status(200).json({ message: "Profile updated", user });
      }
      return response
        .status(500)
        .json({ message: "Error to update the profile" });
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Error to update the profile", error });
    }
  }

  async profile({ request, response, auth }) {
    try {
      const { name, document } = request.all();
      const user = await auth.getUser();
      user.name = name;
      user.document = document;
      const result = await user.save();
      if (result) {
        return response.status(200).json({ message: "Profile updated", user });
      }
      return response
        .status(500)
        .json({ message: "Error to update the profile" });
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Error to update the profile", error });
    }
  }
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
  async verifyHash({ request, response }) {
    try {
      const { email } = request.all();
      const user = await User.query().where("email", email).first();
      if(user === null){
        return response.status(200).json({ hasHash: false });
      }
      return response.status(200).json({ hasHash: user.hash !== null, user_id:user.id });
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
      await transition.rollback();
      return response
        .status(500)
        .json({ message: "Error to create the user", error });
    }
  }
}

module.exports = UserController;
