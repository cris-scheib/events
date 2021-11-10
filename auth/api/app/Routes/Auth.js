'use strict'

const Route = use('Route')

module.exports = () => {
    Route.post('register', 'AuthController.register')
    Route.post('login', 'AuthController.login').validator('auth/Login')
    Route.get('logout', 'AuthController.logout').middleware('auth')
    Route.get('get-token', 'AuthController.getToken')
    Route.post('new-user', 'AuthController.newUser')
}