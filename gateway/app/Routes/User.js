'use strict'

const Route = use('Route')

module.exports = () => {
    Route.get('/', 'UserController.user')
    Route.put('password', 'UserController.password')
    Route.put('profile', 'UserController.profile')
    Route.post('verify-user', 'UserController.verifyUser')
    Route.post('new-user', 'UserController.newUser')
}