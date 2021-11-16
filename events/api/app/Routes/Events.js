'use strict'

const Route = use('Route')

module.exports = () => {
    Route.get('my-events', 'EventsController.myEvents').middleware('auth')
    Route.get('my-certificates', 'EventsController.myCertificates').middleware('auth')
    Route.get('/', 'EventsController.events').middleware('auth')
    Route.get('/:slug', 'EventsController.event').middleware('auth')
}