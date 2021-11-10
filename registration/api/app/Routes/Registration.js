"use strict";

const Route = use("Route");

module.exports = () => {
  Route.get(
    "/registration/:slug",
    "RegistrationController.register"
  ).middleware("auth");
  Route.post(
    "/registration/:slug",
    "RegistrationController.checkIn"
  ).middleware("auth");
  Route.post(
    "/registration/:slug/verify-registered",
    "RegistrationController.verifyRegistered"
  ).middleware("auth");
};
