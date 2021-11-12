"use strict";

const Route = use("Route");

Route.group(use("App/Routes/Mailer")).prefix("/mailer");
