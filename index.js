const { firebase, $http, $scope } = require('./stubs.js')

// firebase.auth().signInWithPopup("").then(console.log).catch(console.log)

const provider = { }
const getMoreData = http => token => {
  const url = 'https://graph.facebook.com/v2.5/me?access_token=' + token + '&fields=id,name,first_name,last_name,email'
  $http.get(url).success(function(jsonService){
    $scope.user.firstName= jsonService.first_name;
    $scope.user.lastName = jsonService.last_name
    $scope.user.email = jsonService.email;
    $scope.user.password=null;
    $scope.user.tokenFB=token;
    // ?
    // $scope.user=true;
  });
}
const getMoreDataWithHttp = getMoreData($http)

$scope.FBLogin = function () {
  firebase.auth().signInWithPopup(provider).then(function(result) {
    var token = result.credential.accessToken;
    var user = result.user;

    $scope.token = token
    $scope.user = user

    // getMoreDataWithHttp(token)

    $scope.authenticate().then(r => {
      console.log("Logged in with Facebook! :)")
    }).catch(e => {
      $scope.Authenticate();
      $scope.checkingUser=false;
      $scope.Register();
    })

  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

$scope.FBLogin()
