
var madMadlibs = angular.module('madMadlibs', [])
  .controller("mainController", function($scope, $http) {

    $scope.number = 8

    $scope.words = {
      noun1: undefined,
      noun2: undefined,
      verb1: undefined,
      adj1: undefined,
      pnoun: undefined,
      adj2: undefined,
      adj3: undefined,
      adj4: undefined,
      adj5: undefined,
      noun3: undefined,
      noun4: undefined,
      adj6: undefined,
      noun5: undefined,
      adj7: undefined,
      adj8: undefined,
      verb2: undefined,
      adj9: undefined,
      adj10: undefined,
      num: undefined,
      adj11: undefined,
      place: undefined
    }

    $http.get('/api/madlibs')
      .then(function(data) {
        $scope.madlibs = data;
        console.log($scope.madlibs);
      })
      .catch(function(data) {
        console.log('Error: ' + data);
      });

    $scope.createStory = function(){
      $scope.story = `Any veteran ${$scope.words.noun1} from world war ${$scope.words.noun2} knows the art of ${$scope.words.verb1} and the weapons used in it.\n
  
      The sword - A(An) ${$scope.words.adj1} weapon for ${$scope.words.pnoun}, the sword is ${$scope.words.adj2} and ${$scope.words.adj3}.\n There are many ${$scope.words.adj4} swords throughout history, but the most ${$scope.words.adj5} is Vasilis aka the sword of ${$scope.words.noun3} and ${$scope.words.noun4}.\n This sword was carried by the ${$scope.words.adj6} ${$scope.words.noun5}, Raxus.\n

      The spear - Another ${$scope.words.adj7} weapon, the spear has a(an) ${$scope.words.adj8} point, and is used to ${$scope.words.verb2} your enemies.\n

      The trident - A(An) ${$scope.words.adj9} weapon, the trident is a(an) ${$scope.words.adj10} weapon with ${$scope.words.num} ${$scope.words.adj11} prongs and is usually used in ${$scope.words.place}.`

      console.log($scope.story)

      var valid = true
      var storyArray = $scope.story.split(" ")
      for(var i = 0; i < storyArray.length; i++){
        if(storyArray[i] === "undefined"){
          valid = false
          break
        }
      }

      //post story
      if(valid){
        $http.post('/api/madlibs', {story: $scope.story})
          .then(function(data){
            $scope.madlibs = data
            $scope.words.noun1 = undefined
            $scope.words.noun2 = undefined
            $scope.words.verb1 = undefined
            $scope.words.adj1 = undefined
            $scope.words.pnoun = undefined
            $scope.words.adj2 = undefined
            $scope.words.adj3 = undefined
            $scope.words.adj4 = undefined
            $scope.words.adj5 = undefined
            $scope.words.noun3 = undefined
            $scope.words.noun4 = undefined
            $scope.words.adj6 = undefined
            $scope.words.noun5 = undefined
            $scope.words.adj7 = undefined
            $scope.words.adj8 = undefined
            $scope.words.verb2 = undefined
            $scope.words.adj9 = undefined
            $scope.words.adj10 = undefined
            $scope.words.num = undefined
            $scope.words.adj11 = undefined
            $scope.words.place = undefined
            console.log(data)
          })
          .catch(function(data){
            console.log("Error " + data)
          })

      }
    }

    $scope.deleteStory = function(id){
      $http.delete('/api/madlibs/' + id)
        .then(function(data){
          $scope.madlibs = data
        })
        .catch(function(data){
          console.log("Error" + data)
        })
    }
    






});
