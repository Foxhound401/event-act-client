const AuthService = require('../services/auth')
const checkRole = require('../middlewares/checkRole')
const isAuth = require('../middlewares/isAuth')
const attachCurrentUser = require('../middlewares/attachCurrentUser')

module.exports = app => {
  app.post('/user/login', async (req, res) => {
    const { email } = req.body.user
    const { password } = req.body.user
    try {
      const authServiceInstance = new AuthService()
      const { user, token } = await authServiceInstance.Login(email, password)
      return res
        .status(200)
        .json({ user, token })
        .end()
    } catch (e) {
      return res
        .json(e)
        .status(500)
        .end()
    }
  })

  // The middlewares need to be placed this way because they depend upong each other
  app.post(
    '/user/login-as',
    isAuth,
    attachCurrentUser,
    checkRole('admin'),
    async (req, res) => {
      try {
        const { email } = req.body.user
        const authServiceInstance = new AuthService()
        const { user, token } = await authServiceInstance.LoginAs(email)
        return res
          .status(200)
          .json({ user, token })
          .end()
      } catch (e) {
        console.log('Error in login as user: ', e)
        return res
          .json(e)
          .status(500)
          .end()
      }
    }
  )

  app.post('/user/signup', async (req, res) => {
    try {
      const { name, email, password } = req.body.user
      const authServiceInstance = new AuthService()
      const { user, token } = await authServiceInstance.SignUp(
        email,
        password,
        name
      )
      return res
        .json({ user, token })
        .status(200)
        .end()
    } catch (e) {
      return res
        .json(e)
        .status(500)
        .end()
    }
  })
}
