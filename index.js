const {
  firebase,
  $http,
  $scope,
  ax: ax,
  enderecoServidor,
  $ionicPopup,
  window,
  UsuarioService,
  randomFail,
  $localStorage
} = require('./stubs.js')

// firebase.auth().signInWithPopup("").then(console.log).catch(console.log)

const provider = { }
const getMoreData = http => token => {
  const url = 'https://graph.facebook.com/v2.5/me?access_token=' + token + '&fields=id,name,first_name,last_name,email'
  $http.get(url).success(function(jsonService){
    $scope.usuario.firstName= jsonService.first_name;
    $scope.usuario.lastName = jsonService.last_name
    $scope.usuario.email = jsonService.email;
    $scope.usuario.password=null;
    $scope.usuario.tokenFB=token;
    // ?
    // $scope.user=true;
  });
}
const getMoreDataWithHttp = getMoreData($http)

const autenticador = function ($scope){
  if ($scope.usuario.email == null) {
    console.log('Não tem email');
    var alertPopup = $ionicPopup.alert({
      title: 'Não foi possível efetuar o login',
      template: 'Por favor, verifique seus dados.'
    });
    $scope.usuario.senha = "";
    return false
  } else if($scope.usuario.tokenFB == null && $scope.usuario.senha == null){
    console.log("sem senha, nem token do FB")
    var alertPopup = $ionicPopup.alert({
      title: 'Não foi possível efetuar o login',
      template: 'Por favor, verifique seus dados.'
    });
    return false
  } else {
    $scope.show();
    return $http.post(enderecoServidor.url+'/usuario/', $scope.usuario).success(function(usuario){
      console.log("Encontrou no BD!")

      $localStorage.usuario=usuario;
      //$scope.isLoggedIn=true;
      $scope.usuario = usuario;
      $scope.usuario.senha = "";
      UsuarioService.setUsuario(usuario);
      window.location = '#/timeline';
      $scope.hide();
      //teste aidax
      ax.ready(function() {
        ax.toggle_debug();
      });
      ax.goal('login', true, false, {
        email: usuario.email
      });
      ax.identify(usuario.email);
      //fim teste-aidax
    }).error(function(erro){
      //if($scope.checkingUser && $scope.usuario.tokenFB!==null){
      //  $scope.checkingUser=false;
      //  $scope.cadastrarFB();
      //  $scope.autenticar();
      if($scope.checkingUser){
        console.log("Usuario não existe")
      } else {
        console.log("Ta aqui o erro")
        $scope.hide();
        console.log("tá entrando aqui!")
        var alertPopup = $ionicPopup.alert({
          title: 'Não foi possível efetuar o login',
          template: 'Por favor, verifique seus dados.'
        });

        $scope.usuario.senha = "";
        console.log(erro);
      }
    });
  }
};


$scope.FBLogin = function () {
  firebase.auth().signInWithPopup(provider).then(function(result) {
    var token = result.credential.accessToken;
    var usuario = result.user;

    $scope.token = token
    $scope.usuario = usuario

    // getMoreDataWithHttp(token)

    console.log("=>>", autenticador($scope))

    while(autenticador($scope) === false) {
      autenticador($scope);
      $scope.checkingUser = false;
      $scope.Register();
    }

    console.log("Logged in with Facebook! :)")
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
