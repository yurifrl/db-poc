const randomFail = name => {
  const result = ~~(Math.random()*2) ? true : false
  console.log('===>', name, result)
  return result
}
const $http = {
  get: url => ({
    success: fn => fn({
      first_name: "asdas",
      last_name: "asdasdasd",
      email: "asdasd@asdasd.com",
    })
  }),
  get: url => ({
    success: fn => fn({
      first_name: "asdas",
      last_name: "asdasdasd",
      email: "asdasd@asdasd.com",
    }),
    fail: fn => fn({

    })
  })
}

const ax = {
  ready: () => false,
  goal: () => false,
  identify: () => false,
  ready: () => false,
}

const window = {
  location: null
}

const $localStorage = { usuario: {} }

const enderecoServidor = {
  url: "asdasd"
}

const $ionicPopup = {
  alert: console.log
}

const UsuarioService = {
  setUsuario: usuario => false
}

module.exports = {
  firebase: {
    auth: () => ({
      signInWithPopup: provider => new Promise((resolve, reject) => {
        const result = {
          credential: {
            accessToken: "asdas"
          },
          user: {
            email: "asdasd",
            tokenFB: "asdasd",
            senha: "asdasd"
          }
        }

        const err = {
          code: "asdsad",
          message: "asdasd",
          email: "asdasd@asdasd.com",
          credential: "asdasd",
        }

        const success = {
          yes: () => resolve(result),
          no: () => reject(err)
        }

        success.yes()
      })
    })
  },
  $http: $http,
  $scope: {
    hide: () => false,
    show: () => false,
    FBLogin: function() {},
    user: {  },
    Register: () => randomFail('Register'),
    Authenticate: () => randomFail('Authenticate'),
  },
  ax: ax,
  $ionicPopup: $ionicPopup,
  enderecoServidor: enderecoServidor,
  UsuarioService: UsuarioService,
  window: window,
  randomFail: randomFail,
  $localStorage: $localStorage
}


