'use strict'

const Route = use('Route')

module.exports = () => {
    Route.get('/', 'EventsController.events').middleware('auth')
    Route.get('/:slug', 'EventsController.event').middleware('auth')
}