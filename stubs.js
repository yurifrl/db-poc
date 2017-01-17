const randomFail = name => {
  const result = ~~(Math.random()*2) ? true : false
  console.log('===>', name, result)
  return result
}

module.exports = {
  firebase: {
    auth: () => ({
      signInWithPopup: provider => new Promise((resolve, reject) => {
        const result = {
          credential: {
            accessToken: "asdas"
          },
          user: {}
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
  $http: {
    get: url => ({
      success: fn => fn({
        first_name: "asdas",
        last_name: "asdasdasd",
        email: "asdasd@asdasd.com",
      })
    })
  },
  $scope: {
    FBLogin: function() {},
    user: {  },
    authenticate: () => newPromise((resolve, reject) => {
      randomFail('authenticate') ? resolve(true) : reject(false)
    }),
    Register: () => randomFail('Register'),
    Authenticate: () => randomFail('Authenticate'),
  }
}

