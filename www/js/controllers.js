angular.module('starter')

  .controller('mainCtrl', function ($scope, $http, $ionicLoading) {
    var Api_Key = '8f52968e46bd20e291e0223d691f88da';


    $scope.update = function () {
      $ionicLoading.show();
      var pos;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          pos = {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          };

          $http({
            method: 'GET',
            url: 'http://api.openweathermap.org/data/2.5/weather',
            params: {
              APPID: Api_Key,
              lat: pos.lat,
              lon: pos.lon,
              units: 'metric'
            }
          })
            .then(function (resp) {
              $scope.weather = resp.data;
              console.log(resp.data)
              $ionicLoading.hide()
            })
        }, function () {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }


    }
    $scope.update();


  })


;
