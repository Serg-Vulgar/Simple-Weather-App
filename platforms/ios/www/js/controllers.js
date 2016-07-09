angular.module('starter')

.controller('mainCtrl', function ($scope, $http, $ionicLoading, $cordovaGeolocation, $interval) {
  var Api_Key = '8f52968e46bd20e291e0223d691f88da';

  $scope.update = function () {
      // $ionicLoading.show();

      var posOptions = {
        timeout: 10000,
        enableHighAccuracy: true
      };
      $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        // $http({
        //   method: 'GET',
        //   url: 'http://api.openweathermap.org/data/2.5/weather',
        //   params: {
        //     'appid': Api_Key,
        //     'lat': lat,
        //     'lon': long,
        //     'units': 'metric'
        //   }
        // })
        $http({
          method: 'GET',
          url: 'http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&APPID=8f52968e46bd20e291e0223d691f88da'

        })
        .then(function (resp) {
          $scope.weather = resp.data;
          alert('resp', resp.data);
          // $ionicLoading.hide();
        }, function(err){
          alert('err', err.data);
          $scope.error = err;
        });
      }, function(err) {
        alert('Что-то пошло не так (((');
        // $ionicLoading.hide();
        $scope.weather = 'Что-то пошло не так (((';
      });
    };

    $scope.update();

    $interval(function () {
      $scope.update();
    }, 600*1000);

  })


;
