'use strict'

const Route = use('Route')

module.exports = () => {
    Route.get('/', 'UserController.user')
    Route.put('/password/', 'UserController.password').middleware('auth').validator('user/ChangePassword')
    Route.put('/profile/', 'UserController.profile').middleware('auth')
}