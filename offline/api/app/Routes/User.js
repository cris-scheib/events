'use strict'

const Route = use('Route')

module.exports = () => {
    Route.post('verify-user', 'UserController.verifyUser')
    Route.post('new-user', 'UserController.newUser').middleware('auth')
}