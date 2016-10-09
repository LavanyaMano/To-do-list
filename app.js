'use strict';

angular.module('app', [])
    .controller('MainCtrl', MainController);

function MainController($scope) {
   $scope.userList =[{
        task:"first",
        detail:"first detail",
        time:"",
        value:"",
        status:true,
                },
                {
                    task:"second",
                    detail:"second detail",
                    time:"",
                    value:"",
                    status:false,
                }];
    $scope.newItem ={};
    $scope.selectedItem=$scope.userList[0];
    $scope.rowLimit = 4;
    $scope.sortList = "task"; 
    $scope.setSelectItem = function(item){
        $scope.selectedItem=item;
        $scope.index = $scope.userList.indexOf($scope.selectedItem);
    };
    $scope.editMode=false;
    $scope.mode = function(action){
        switch (action){
            case 0:
                $scope.addMode=true;
                $scope.editMode=false;
                break;
            case 1:
                $scope.addMode=false;
                $scope.editMode=true;
                break;
        }
    };

    $scope.addList = function(item) {
        $scope.selectedItem = $scope.newItem;
        $scope.selectedItem.time=Date.now();
        $scope.mode(0);
    };
    $scope.saveList=function(action){
        action == 2 ? $scope.userList.splice($scope.index,1)
                    : $scope.selectedItem.task!= null
                    ? $scope.userList.push($scope.selectedItem)
                    : alert('Nothin to save')
        $scope.newItem={};
        $scope.addMode=false;
        $scope.editMode=false;
    };


    $scope.checkboxModel = {
       value1 : true,
     };


};