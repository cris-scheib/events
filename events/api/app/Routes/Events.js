'use strict'

const Route = use('Route')

module.exports = () => {
    Route.get('/', 'EventsController.getEvents')
    Route.get('/:slug', 'EventsController.getEvent')
}