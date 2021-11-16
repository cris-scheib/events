"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Event extends Model {
  static boot() {
    super.boot();
  }
  eventsUsers() {
    return this.hasMany('App/Models/EventsUser')
  }
}

module.exports = Event;
