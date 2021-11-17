"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class EventsUser extends Model {
  static boot() {
    super.boot();
  }
}

module.exports = EventsUser;