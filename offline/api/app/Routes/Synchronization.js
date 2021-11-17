"use strict";

const Route = use("Route");

module.exports = () => {
  Route.get("/", "SynchronizationController.sync").middleware("auth");
};