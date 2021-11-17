"use strict";

const Route = use("Route");

module.exports = () => {
  Route.post("login", "MailerController.login");
  Route.get("confirm-register/:slug", "MailerController.confirmRegister");
  Route.post("confirm-entry/:slug", "MailerController.confirmEntry");
  Route.get("cancel-register/:slug", "MailerController.cancelRegister");
  Route.get("certificate/:slug", "MailerController.certificate");
};
