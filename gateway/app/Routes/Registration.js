'use strict'

const Route = use('Route')

module.exports = () => {
    Route.get('/:slug', 'RegistrationController.register')
    Route.delete('/:slug', 'RegistrationController.cancel')
    Route.post('/:slug', 'RegistrationController.checkIn')
    Route.get('/:slug/verify-registered', 'RegistrationController.verifyRegistered')
}