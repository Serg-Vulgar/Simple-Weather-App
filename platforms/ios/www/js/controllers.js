angular.module('starter')

  .controller('mainCtrl', function ($scope, $http, $ionicLoading, $cordovaGeolocation, $interval, $state) {
    var Api_Key = '8f52968e46bd20e291e0223d691f88da';
    $scope.setTime = function (time) {
      $scope.time = time;
    }

    $interval(function () {
      $scope.timeNow = Date.now();
    }, 1000);

    $scope.update = function () {
      $scope.time = new Date();
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
            appid: Api_Key,
            lat: lat,
            lon: long,
            units: 'metric',
            type: 'accurate',
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
            appid: Api_Key,
            lat: lat,
            lon: long,
            units: 'metric',
            type: 'accurate',
            lang: 'ru'
          }
        })
          .then(function (resp) {
            $scope.forecast = resp.data;
            var graphicList = $scope.forecast.list.slice(0, 4);

            console.log(resp.data)
            console.log(graphicList)
            var daysArray = [];
            var day = 0;

            daysArray[0] = [];
            daysArray[0].push(resp.data.list[0]);
            var tempElementDate = new Date(resp.data.list[0].dt * 1000);

            for (var i = 1; i < resp.data.list.length; i++) {
              var elementDate = new Date(resp.data.list[i].dt * 1000);
              if (tempElementDate.getDate() === elementDate.getDate()) {
                daysArray[day].push(resp.data.list[i]);
              } else {
                day++;
                tempElementDate = new Date(resp.data.list[i].dt * 1000);
                daysArray[day] = [];
                daysArray[day].push(resp.data.list[i]);
              }
            }
            $scope.daysArray = daysArray;
            console.log(daysArray, 'daysArray')


            var ctx = document.getElementById("Chart").getContext("2d");
            var myChart = new Chart(ctx, {
              type: 'line',
              options: {
                // responsive: true,
                legend: {
                  display: false
                },
                elements: {
                  point: {
                    radius: 2
                  }
                },
                tooltips: {
                  enabled: false
                },
                scales: {
                  xAxes: [{
                    display: false
                  }],
                  yAxes: [{
                    display: false
                  }]
                }
              },
              data: {
                labels: [
                  graphicList[0].main.temp + ' \u2103',
                  graphicList[1].main.temp + ' \u2103',
                  graphicList[2].main.temp + ' \u2103',
                  graphicList[3].main.temp + ' \u2103'
                ],
                datasets: [{
                  data: [graphicList[0].main.temp, graphicList[1].main.temp, graphicList[2].main.temp, graphicList[3].main.temp],
                  borderWidth: 3
                }]
              }

            });


            // tempArray.forEach(function (element) {
            //   var firstElementDate = new Date(tempArray[0].dt * 1000);
            //   var elementDate = new Date(element.dt * 1000);
            //
            //   if (firstElementDate.getDate() == elementDate.getDate()) {
            //     tempArray.splice(element, 1);
            //     daysArray[day] = [];
            //     daysArray[day].push(
            //       element
            //     );
            //     console.log(tempArray)
            //   }
            // });


          });
      });

    };

    $scope.update();

    $interval(function () {
      $scope.update();
      $scope.time = new Date();
    }, 600 * 1000);


    $scope.openMap = function () {
      $state.go('map');
    };

    $scope.time = new Date();


  })

  .controller('mapCtrl', function ($scope, $ionicHistory) {
    $scope.goBack = function () {
      $ionicHistory.goBack();
    };


  })


;
