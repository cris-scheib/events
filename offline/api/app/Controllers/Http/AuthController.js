"use strict";
const User = use("App/Models/User");
const Database = use("Database");
const Cache = use("Cache");

class AuthController {
  async register({ request, response, auth }) {
    const transition = await Database.beginTransaction();
    try {
      const { email, password, name, document } = request.all();
      const user = await User.create(request.all());
      if (user) {
        const token = await auth.attempt(email, password);
        await Cache.forever("token", token);
        await transition.commit();
        return response.status(201).json({ token, name });
      } else {
        await transition.rollback();
        return response
          .status(500)
          .json({ message: "Error to create the user", error });
      }
    } catch (error) {
      await transition.rollback();
      return response
        .status(500)
        .json({ message: "Error to create the user", error });
    }
  }

  async login({ request, response, auth }) {
    const { email, password } = request.all();
    const token = await auth.attempt(email, password);
    const { name } = await User.findBy("email", email);
    if (token) {
      await Cache.forever("token", token);
      return response.status(201).json({ token, name });
    } else {
      return response
        .status(403)
        .json({ message: "Invalid email or password " });
    }
  }
  async logout({ response, auth }) {
    try {
      const isLogged = await auth.check();
      if (isLogged) {
        const user = await User.find(1);
        await auth.authenticator("jwt").revokeTokensForUser(user);
      }
      if (await Cache.has("token")) {
        await Cache.forget("token");
      }
      return response.status(200).json({ message: "User disconnected" });
    } catch (error) {
      return response
        .status(403)
        .json({ message: "Authenticated user not found" });
    }
  }
}

module.exports = AuthController;
