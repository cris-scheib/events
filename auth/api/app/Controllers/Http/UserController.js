'use strict'

const Hash = use('Hash')
const User = use('App/Models/User')

class UserController {

    async user({ response, auth }) {
        // try {
            console.log(auth)
        //     const user = await auth.getUser()
        //     return response.status(200).json(user)
        // } catch (error) {
        //     return response.status(500).json({ message: 'Unauthenticated user ', error })
        // }
    }
    async password({ request, response, auth }) {

        try {
            const { password, newPassword } = request.all()
            const user = await auth.getUser()
            const passwordValid = await Hash.verify(password, user.password);
            if (!passwordValid) {
                return response.status(400).json({ message: "Passwords are not compatible" })
            }
            user.password = newPassword
            const result = await user.save()
            if(result){
                return response.status(200).json({ message: "Password updated" })
            }
            return response.status(500).json({ message: 'Error to update the password' })
        } catch (error) {
            return response.status(500).json({ message: 'Error to update the password', error })

        }
    }
    async profile({ request, response, auth }) {

        try {
            const { name, document } = request.all()
            const user = await auth.getUser()
            user.name = name
            user.document = document
            const result = await user.save()
            if(result){
                return response.status(200).json({ message: "Profile updated", user })
            }
            return response.status(500).json({ message: 'Error to update the profile'})
        } catch (error) {
            return response.status(500).json({ message: 'Error to update the profile', error })

        }
    }


}

module.exports = UserController