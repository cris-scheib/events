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

 Factory.blueprint('App/Models/Event', async (faker,i, data) => {
    return {
      dateTimeEvent: data[i].dateTimeEvent,
      dateTimeStartRegistration: data[i].dateTimeStartRegistration,
      dateTimeEndRegistration: data[i].dateTimeEndRegistration,
      description: data[i].description,
      title: data[i].title,
      local: data[i].local,
      image: data[i].image,
      slug: data[i].slug,
      template: data[i].template,
    }
  })