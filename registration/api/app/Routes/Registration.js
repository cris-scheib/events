'use strict'

const Route = use('Route')

module.exports = () => {
    Route.get('/:slug', 'RegistrationController.register')
    Route.post('/:slug', 'RegistrationController.checkIn')
}