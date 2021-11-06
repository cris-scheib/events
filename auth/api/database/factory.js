'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
 const Factory = use('Factory')

 Factory.blueprint('App/Models/User', async (faker,i, data) => {
    return {
      email: data[i].email,
      name: data[i].name,
      password: data[i].password,
      document: data[i].document,
      is_admin: data[i].is_admin
    }
  })