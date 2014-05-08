function taskCtrl($scope, $http) {

    var url = "http://" + window.location.hostname + ":3000";


    /*
    $scope.tasks = [{text:'learn angular', done:true},
    {text:'build an angular app', done:false}];
    */
    $scope.tasks;

    $http.get(url + "/tasks")
    .success(function (data) {
        $scope.tasks = data
    })

    $scope.addtask = function() {
        var newtask = {text:$scope.taskText, done:false};
        $scope.taskText = '';

        $http.post(url + "/tasks", newtask)
        .success(function (data) {
            $scope.tasks = data
            console.log("Added task to DB");
        })

    };

    $scope.remaining = function() {
        var count = 0;
        angular.forEach($scope.tasks, function(task) {
          count += task.done ? 0 : 1;
        });
        return count;
     };


    $scope.updateStatus = function(task) {

        console.log(task);
        $http.put(url + "/tasks/" + task.id , task)
            .success(function (data) {
                $scope.tasks = data
                console.log("Modified task in DB");
        });
    };


    $scope.archiveTask = function() {

        var oldtasks = $scope.tasks;
        $scope.tasks = [];
        angular.forEach(oldtasks, function(task) {
            if (!task.done) {
                $scope.tasks.push(task);
            } else {
                $http.delete(url + "/tasks/"  + task.id)
                    .success(function (data) {
                        console.log("Removed task in DB");
                });
            }
        });
    };
}


