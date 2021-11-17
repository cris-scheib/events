"use strict";

const Route = use("Route");

module.exports = () => {
  Route.post("login", "MailerController.login");
  Route.get("confirm-register/:slug", "MailerController.confirmRegister").middleware("auth");
  Route.post("confirm-entry/:slug", "MailerController.confirmEntry").middleware("auth");
  Route.get("cancel-register/:slug", "MailerController.cancelRegister").middleware("auth");
  Route.get("certificate/:slug", "MailerController.certificate").middleware("auth");
};
