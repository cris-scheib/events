'use strict'
const Factory = use('Factory')

class UserSeeder {
    async run() {
        await Factory.model('App/Models/User').createMany(2, [
            {
                name: 'cristine',
                email: 'cris.scheib@hotmail.com',
                document: '000.000.000-00',
                password: 'teste123',
                is_admin: true
            },
            {
                name: 'teste',
                email: 'teste@teste.com',
                document: '111.111.111-11',
                password: 'teste123',
                is_admin: false
            },
        ])
    }
}

module.exports = UserSeeder