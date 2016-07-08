angular.module('starter')

  .controller('mainCtrl', function ($scope, $http, $ionicLoading, $cordovaGeolocation, $interval) {
    var Api_Key = '8f52968e46bd20e291e0223d691f88da';

    $scope.update = function () {
      $ionicLoading.show();

      var posOptions = {timeout: 10000, enableHighAccuracy: false};
      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
          var lat  = position.coords.latitude;
          var lon = position.coords.longitude;

          $http({
            method: 'GET',
            url: 'http://api.openweathermap.org/data/2.5/weather',
            params: {
              APPID: Api_Key,
              lat: lat,
              lon: lon,
              units: 'metric'
            }
          })
            .then(function (resp) {
              $scope.weather = resp.data;
              console.log(resp.data);
              $ionicLoading.hide();
            })
        }, function(err) {
          alert('Что-то пошло не так (((')
          $ionicLoading.hide();
          $scope.weather = 'Что-то пошло не так (((';
        });
    };

    $scope.update();

    $interval(function () {
      $scope.update();
    }, 600*1000)
    
  })


;
