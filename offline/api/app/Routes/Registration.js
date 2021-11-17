"use strict";

const Route = use("Route");

module.exports = () => {
  Route.post("/:slug", "RegistrationController.checkIn").middleware("auth");
  Route.get(
    "/:slug/verify-registered",
    "RegistrationController.verifyRegistered"
  ).middleware("auth");
};