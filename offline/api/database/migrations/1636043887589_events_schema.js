'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EventsSchema extends Schema {
  up () {
    this.create('events', (table) => {
      table.increments()
      table.timestamp('dateTimeEvent')
      table.timestamp('dateTimeStartRegistration')
      table.timestamp('dateTimeEndRegistration')
      table.text('description')
      table.string('title')
      table.string('local')
      table.string('image')
      table.string('slug')
      table.string('template')
      table.timestamps()
    })
  }

  down () {
    this.drop('events')
  }
}

module.exports = EventsSchema
