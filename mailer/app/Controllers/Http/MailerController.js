"use strict";
const Mail = use("Mail");
const Event = use("App/Models/Event");
const EventsUser = use("App/Models/EventsUser");
const User = use("App/Models/User");
const Env = use("Env");
const moment = use("moment");

class MailerController {
  async login({ response, request }) {
    const { user_id } = request.all();
    const user = await User.find(user_id);
    const mail = this.sendEmail({
      email: user.email,
      name: user.name,
      content: {
        name: user.name,
        url: Env.get("APP_AUTH_URL") + "/create-password/" + user.hash,
      },
      subject: "Confirm the login",
      template: "emails.login",
    });
    if (mail) {
      return response.status(200).json({ message: "Email successfully sent" });
    } else {
      return response.status(500).json({ message: "Error sending the e-mail" });
    }
  }
  async confirmRegister({ response, auth, params }) {
    const user = await auth.getUser();
    const event = await Event.query().where("slug", params.slug).first();
    const date = moment(event.dateTimeEvent).format("YYYY-MM-DD h:mm:ss a");
    const mail = this.sendEmail({
      email: user.email,
      name: user.name,
      content: { event, user, date },
      subject: "Registration confirmation",
      template: "emails.confirm-register",
    });
    if (mail) {
      return response.status(200).json({ message: "Email successfully sent" });
    } else {
      return response.status(500).json({ message: "Error sending the e-mail" });
    }
  }
  async cancelRegister({ response, auth, params }) {
    const user = await auth.getUser();
    const event = await Event.query().where("slug", params.slug).first();
    const date = moment(event.dateTimeEvent).format("YYYY-MM-DD h:mm:ss a");
    const mail = this.sendEmail({
      email: user.email,
      name: user.name,
      content: { event, user, date },
      subject: "Registration canceled",
      template: "emails.cancel-register",
    });
    if (mail) {
      return response.status(200).json({ message: "Email successfully sent" });
    } else {
      return response.status(500).json({ message: "Error sending the e-mail" });
    }
  }
  async confirmEntry({ response, params, request }) {
    const { user_id } = request.all();
    const user = await User.find(user_id);
    const event = await Event.query().where("slug", params.slug).first();
    const date = moment().format("YYYY-MM-DD h:mm:ss a");
    const mail = this.sendEmail({
      email: user.email,
      name: user.name,
      content: { event, user, date },
      subject: "Entry confirmation",
      template: "emails.confirm-entry",
    });
    if (mail) {
      return response.status(200).json({ message: "Email successfully sent" });
    } else {
      return response.status(500).json({ message: "Error sending the e-mail" });
    }
  }
  async certificate({ response, params, auth }) {
    const user = await auth.getUser();
    const event = await Event.query().where("slug", params.slug).first();
    const eventUser = await EventsUser.query()
      .where("event_id", event.id)
      .where("user_id", user.id)
      .first();
    if (eventUser !== null) {
      const url = Env.get("APP_PRINT_URL") + '/' + event.slug;
      const mail = this.sendEmail({
        email: user.email,
        name: user.name,
        content: { event, user, eventUser, url },
        subject: "Certificate",
        template: "emails.certificate",
      });
      if (mail) {
        return response
          .status(200)
          .json({ message: "Email successfully sent" });
      } else {
        return response
          .status(500)
          .json({ message: "Error sending the e-mail" });
      }
    } else {
      return response
        .status(403)
        .json({ message: "You do not have authorization for this page" });
    }
  }

  async sendEmail(data) {
    try {
      const result = await Mail.send(data.template, data.content, (message) => {
        message.to(data.email, data.name);
        message.from(Env.get("MAIL_FROM_EMAIL"), Env.get("MAIL_FROM_NAME"));
        message.subject(data.subject);
      });
      return true;
    } catch (err) {
      return false;
    }
  }
}

module.exports = MailerController;
