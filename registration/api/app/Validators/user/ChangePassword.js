'use strict'

class ChangePassword {

  get rules() {
    return {
        newPassword: 'required',
        password: 'required',
    }
  }

  get data() {
    return this.ctx.request.all()
  }

  get messages() {
    return {

    }
  }

  async fails(errors) {
    return this.ctx.response.status(400).json({
      message: "Something went wrong",
      errors: errors
    })
  }

}

module.exports = ChangePassword