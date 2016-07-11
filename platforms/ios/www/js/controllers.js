angular.module('starter')

  .controller('mainCtrl', function ($scope, $http, $ionicLoading, $cordovaGeolocation, $interval) {
    var Api_Key = '8f52968e46bd20e291e0223d691f88da';


    $interval(function () {
      $scope.timeNow = Date.now();
    }, 1000);

    $scope.update = function () {

      var posOptions = {
        timeout: 10000,
        enableHighAccuracy: true
      };
      $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        $http({
          method: 'GET',
          url: 'http://api.openweathermap.org/data/2.5/weather',
          params: {
            'appid': Api_Key,
            'lat': lat,
            'lon': long,
            'units': 'metric',
            lang: 'ru'
          }
        })
          .then(function (resp) {
            $scope.weather = resp.data;
            $scope.lastUpdate = Date.now();
          });

        $http({
          method: 'GET',
          url: 'http://api.openweathermap.org/data/2.5/forecast',
          params: {
            'appid': Api_Key,
            'lat': lat,
            'lon': long,
            'units': 'metric',
            lang: 'ru'
          }
        })
          .then(function (resp) {
            $scope.forecast = resp.data;

            var tempArray = resp.data.list;
            var daysArray = [];
            var day = 0;

            tempArray.forEach(function (element) {
              var firstElementDate = new Date(tempArray[0].dt * 1000);
              var elementDate = new Date(element.dt * 1000);

              if (firstElementDate.getDate() == elementDate.getDate()) {
                tempArray.splice(element, 1);
                daysArray[day] = [];
                daysArray[day].push(
                  element
                );
                console.log(tempArray)
              }
            });

            console.log(daysArray)

          });
      });

    };

    $scope.update();

    $interval(function () {
      $scope.update();
      $scope.time = new Date().getHours();
    }, 600 * 1000);


    $scope.time = new Date().getHours();


  })


;
