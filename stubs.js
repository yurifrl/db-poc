const hi = "asd"
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
    user: {  }
  },
  authenticate: () => false,
  Register: () => false,
  Authenticate: () => false,
}

