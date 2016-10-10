'use strict';

angular.module('app', [])
    .controller('MainCtrl', MainController);

function MainController($scope) {
    $scope.mainList = [{
        label: "To Do List",list:[{task:"second",
                    detail:"second detail",
                    time:"",
                    value:"",
                    status:false,}
        ]},
        {label:"Grocery",list:[{
                    task:"first",
                    detail:"first detail",
                    time:"",
                    value:"",
                    status:true,
                            },
        ]},
        {label:"HomeWork",list:[{
                    task:"homewwork",
                    detail:"homewwork detail",
                    time:"",
                    value:"",
                    status:true,
                            },]
        }];

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
        $scope.index = $scope.selectedLabel.list.indexOf($scope.selectedItem);
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
        action == 2 ? $scope.selectedLabel.list.splice($scope.index,1)
                    : $scope.selectedItem.task!= null
                    ? $scope.selectedLabel.list.push($scope.selectedItem)
                    : alert('Nothin to save')
        $scope.newItem={};
        $scope.addMode=false;
        $scope.editMode=false;
    };


    $scope.selectedLabel = $scope.mainList[0];
    console.log($scope.selectedLabel);

    $scope.setSelectLabel = function(element){
        $scope.selectedLabel=element;
        $scope.index = $scope.mainList.indexOf($scope.selectedLabel);
        console.log($scope.selectedLabel);
    };
    $scope.newLabel = {};
    $scope.addLabel = function(label){
        $scope.selectedLabel = $scope.newLabel;
        $scope.selectedLabel.list = [];
        $scope.add = true;
        console.log("label is "+$scope.selectedLabel);
    };
    $scope.saveLabel= function(){
        $scope.selectedLabel.label != null ? 
        $scope.mainList.push($scope.selectedLabel):
        alert("Label not created");
        $scope.newLabel={};
        $scope.add = false;
    };

};