'use strict'

const Route = use('Route')

module.exports = () => {
    Route.get('/', 'EventsController.getEvents').middleware('auth')
    Route.get('/:slug', 'EventsController.getEvent').middleware('auth')
}