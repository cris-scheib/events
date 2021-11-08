'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EventsUsersSchema extends Schema {
  up () {
    this.create('events_users', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('event_id').unsigned().references('id').inTable('events')
      table.timestamp('dateTimeRegistration')
      table.timestamp('dateTimeEntrance')
      table.timestamps()
    })
  }

  down () {
    this.drop('events_users')
  }
}

module.exports = EventsUsersSchema
