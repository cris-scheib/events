"use strict";

const Route = use("Route");

module.exports = () => {
  Route.get("/:slug", "RegistrationController.register").middleware("auth");
  Route.delete("/:slug", "RegistrationController.cancel").middleware("auth");
  Route.post("/:slug", "RegistrationController.checkIn").middleware("auth");
  Route.get(
    "/:slug/verify-registered",
    "RegistrationController.verifyRegistered"
  ).middleware("auth");
};
