'use strict'

const Route = use('Route')

module.exports = () => {
    Route.get('my-events', 'EventsController.myEvents')
    Route.get('my-certificates', 'EventsController.myCertificates')
    Route.get('/', 'EventsController.events')
    Route.get('/:slug', 'EventsController.event')
}