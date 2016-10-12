'use strict';

angular.module('app', [])
    .controller('MainCtrl', MainController);

function MainController($scope) {
    $scope.mainList = [{
        label: "To Do List",list:[{task:"Second",
                    detail:"second detail",
                    time:Date.now(),
                    value:"",
                    status:false,
                }
        ]},
        {label:"Grocery",list:[{
                    task:"First",
                    detail:"first detail",
                    time:Date.now(),
                    value:"",
                    status:true,
                            },
        ]},
        {label:"HomeWork",list:[{
                    task:"Homewwork",
                    detail:"homewwork detail",
                    time:Date.now(),
                    value:"",
                    status:true,
                            },]
        }];

    $scope.newItem ={};
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
    $scope.setSelectLabel = function(element){
        $scope.selectedLabel=element;
        $scope.indexLabel = $scope.mainList.indexOf($scope.selectedLabel);
    };
    $scope.newLabel = {};
    $scope.addLabel = function(label){
        $scope.selectedLabel = $scope.newLabel;
        $scope.selectedLabel.list = [];
        $scope.add = true;
    };
    $scope.saveLabel= function(){
        $scope.selectedLabel.label != null ? 
        $scope.mainList.push($scope.selectedLabel):
        alert("Label not created");
        $scope.newLabel={};
        $scope.add = false;
    };
    $scope.deleteLabel=function(){
        $scope.mainList.splice($scope.indexLabel, 1)
    }
    $scope.diffDays=function(item){
        var classname = ((item.value - Date.now()) / (1000 * 60 * 60 * 24)) < 1 ? "list-group-item-danger" :
          ((item.value - item.time) / (1000 * 60 * 60 * 24)) <= 2 ? "list-group-item-warning":"";
        console.log(((item.value - Date.now()) / (1000 * 60 * 60 * 24)));
        return classname;
    }
    $scope.page = 0;
    $scope.pageNo = function(action){
        action == 0 ? $scope.page++ : action == 1 ? $scope.page-- : "";
        console.log($scope.page)
        return $scope.page
    }

    $scope.itemsPaginated = function () {
        $scope.currentPageIndex = $scope.page * $scope.rowLimit;
        console.log('currentPageIndex', $scope.currentPageIndex)
        console.log('page', $scope.page)
        console.log('rowLimit', $scope.rowLimit)

        return $scope.selectedLabel.list.slice(
            $scope.currentPageIndex, 
            $scope.currentPageIndex + $scope.rowLimit);
    }
};